import {Header} from "@/components/Header";
import {ProductCard} from "@/components/ProductCard";

import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import {API_BASE_URL, type Product} from "./lib/api";
import {
  SocketProvider,
  useSocket,
  useSocketConnection,
} from "./lib/socket.context";
import {CreateProductPage} from "./pages/CreateProduct";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const isConnected = useSocketConnection();

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();

        setProducts(data?.data?.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("stock-update", (payload: any) => {
      const data = payload?.data ?? payload;

      if (!data?.productId) return;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === data.productId
            ? {...p, availableStock: data.availableStock}
            : p,
        ),
      );
    });

    // purchase update

    socket.on("purchase-success", (userPaylaod: any) => {
      const data = userPaylaod?.data ?? userPaylaod;
      console.log(data, "purchase");
      setProducts((prev) =>
        prev.map((p: any) => {
          if (p.id === data.productId) {
            const currentPurchases = p.purchases || [];
            const newPurchases = [
              {user: {userName: data.userName}},
              ...currentPurchases,
            ].slice(0, 3);

            return {...p, purchases: newPurchases};
          }
          return p;
        }),
      );
    });

    return () => {
      socket.off("stock-update");
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
          </div>
          <p className="text-gray-400 text-sm font-medium animate-pulse">
            Loading Drops...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header isConnected={isConnected} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 animate-slide-up">
          <h2 className="text-4xl font-extrabold tracking-tight mb-2">
            Latest <span className="gradient-text">Drops</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Exclusive sneakers. Limited time. Real-time stock.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No drops available yet</p>
            <p className="text-gray-600 text-sm mt-1">
              Check back soon for new releases
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(15, 15, 25, 0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProductPage />} />
        </Routes>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(15, 15, 25, 0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              color: "#fff",
            },
          }}
        />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
