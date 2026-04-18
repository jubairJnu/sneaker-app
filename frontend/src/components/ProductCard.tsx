import {Button} from "@/components/ui/button";
import {useEffect, useMemo, useState} from "react";

import {purchaseProduct, reserveProduct, type ReserveResponse} from "@/lib/api";
import {getClientId} from "@/lib/utils";
import {Clock, Flame, Package, ShoppingCart, Timer, Zap} from "lucide-react";
import {toast} from "sonner";

interface ProductCardProps {
  product: any;
}

export const ProductCard = ({product}: ProductCardProps) => {
  const [isReserving, setIsReserving] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isReservedByMe, setIsReservedByMe] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [reservationResponse, setReservationResponse] = useState<
    ReserveResponse["data"] | null
  >(null);

  console.log(product, "pro");

  // Countdown to endTime
  const dropCountdown = useMemo(() => {
    if (!product.endTime) return null;
    const end = new Date(product.endTime).getTime();
    const now = Date.now();
    const diff = end - now;
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }, [product.endTime]);

  const stockPercentage = product.totalStock
    ? (product.availableStock / product.totalStock) * 100
    : 0;

  const isLowStock = product.availableStock > 0 && product.availableStock <= 3;
  const isOutOfStock = product.availableStock <= 0;

  useEffect(() => {
    let interval: number;
    if (timeLeft !== null && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsReservedByMe(false);
      setTimeLeft(null);
      setReservationResponse(null);
      toast.error("Reservation expired!");
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleReserve = async () => {
    const clientId = getClientId();
    let username = localStorage.getItem("username");

    if (!username) {
      username = prompt("Enter a nickname to reserve this sneaker:");
      if (!username) return;
      localStorage.setItem("username", username);
    }

    setIsReserving(true);
    try {
      const response = await reserveProduct({
        productId: product.id,
        clientId,
        userName: username!,
      });

      setReservationResponse(response.data);
      setIsReservedByMe(true);
      setTimeLeft(60);
      localStorage.setItem("userId", response.data.userId);
      toast.success("Item reserved for 60 seconds!");
    } catch (error: any) {
      toast.error(error.message || "Failed to reserve");
    } finally {
      setIsReserving(false);
    }
  };

  const handlePurchase = async () => {
    try {
      const userId = localStorage.getItem("userId") || "";
      if (!reservationResponse) {
        throw new Error("No active reservation found");
      }
      await purchaseProduct({
        reservationId: reservationResponse.id,
        userId,
      });

      setIsReservedByMe(false);
      setTimeLeft(null);
      setReservationResponse(null);
      toast.success("Purchase successful! Check your email.");
    } catch (error: any) {
      toast.error(error.message || "Purchase failed. Please try again.");
    }
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden glass-card glass-card-hover transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in"
      style={{animationDelay: `${Math.random() * 0.3}s`}}
    >
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20" />

      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-900/50 aspect-[4/3]">
        {/* Shimmer loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 shimmer" />
        )}
        <img
          src={product.photoUrl}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {/* Stock badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
              isOutOfStock
                ? "bg-red-500/20 border-red-500/30 text-red-300"
                : isLowStock
                  ? "bg-amber-500/20 border-amber-500/30 text-amber-300"
                  : "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
            }`}
          >
            <Package size={12} />
            {isOutOfStock ? "Sold Out" : `${product.availableStock} left`}
          </div>

          {/* Low stock fire badge */}
          {isLowStock && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-orange-500/20 border border-orange-500/30 text-orange-300 backdrop-blur-md animate-pulse">
              <Flame size={12} />
              Hot
            </div>
          )}
        </div>

        {/* Drop countdown */}
        {dropCountdown && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-md border border-white/10 text-gray-300">
            <Clock size={12} className="text-blue-400" />
            Ends in {dropCountdown}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Product name & price */}
        <div>
          <h3 className="text-white font-bold text-base leading-tight line-clamp-2 group-hover:text-blue-100 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold gradient-text">
              ${product.price?.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Stock progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
            <span>Availability</span>
            <span>
              {product.availableStock}/{product.totalStock}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isOutOfStock
                  ? "bg-red-500"
                  : isLowStock
                    ? "bg-gradient-to-r from-amber-500 to-orange-500"
                    : "bg-gradient-to-r from-emerald-500 to-cyan-500"
              }`}
              style={{width: `${stockPercentage}%`}}
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-semibold">
            Recent Purchasers
          </p>
          <div className="flex -space-x-2 overflow-hidden mb-1">
            {product.purchases && product.purchases.length > 0 ? (
              product.purchases.map((purchase: any, i: number) => (
                <div
                  key={i}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-gray-900 bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white"
                  title={purchase.user.userName}
                >
                  {purchase.user.userName.charAt(0).toUpperCase()}
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-600">No purchases yet</span>
            )}
          </div>
          {product.purchases && product.purchases.length > 0 && (
            <p className="text-[10px] text-gray-400">
              {product.purchases[0].user.userName} and{" "}
              {product.purchases.length - 1} others copped!
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="pt-1">
          {isReservedByMe ? (
            <div className="space-y-2.5">
              {/* Reservation timer */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                  <Timer size={14} className="animate-pulse" />
                  Reserved
                </span>
                <span className="text-sm font-bold text-orange-300 tabular-nums">
                  {timeLeft}s
                </span>
              </div>

              {/* Timer progress bar */}
              <div className="h-1 rounded-full bg-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-1000 ease-linear"
                  style={{width: `${((timeLeft || 0) / 60) * 100}%`}}
                />
              </div>

              <Button
                onClick={handlePurchase}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 border-0"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Complete Purchase
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleReserve}
              disabled={isOutOfStock || isReserving}
              className={`w-full h-11 rounded-xl font-bold text-sm transition-all duration-300 border-0 ${
                isOutOfStock
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isReserving ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Reserving...
                </span>
              ) : isOutOfStock ? (
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Sold Out
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Reserve Now
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
