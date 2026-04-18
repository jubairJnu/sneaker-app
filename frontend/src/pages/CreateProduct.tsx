import {Button} from "@/components/ui/button";
import {createProduct} from "@/lib/api";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  ImageIcon,
  Layers,
  Loader2,
  Package,
  Plus,
  Sparkles,
  Type,
  Zap,
} from "lucide-react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "sonner";

interface FormData {
  name: string;
  photoUrl: string;
  totalStock: string;
  price: string;
  endTime: string;
}

interface FormErrors {
  name?: string;
  photoUrl?: string;
  totalStock?: string;
  price?: string;
  endTime?: string;
}

export function CreateProductPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    photoUrl: "",
    totalStock: "",
    price: "",
    endTime: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.totalStock || parseInt(formData.totalStock) <= 0) {
      newErrors.totalStock = "Stock must be at least 1";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    } else if (new Date(formData.endTime) <= new Date()) {
      newErrors.endTime = "End time must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({...prev, [field]: value}));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({...prev, [field]: undefined}));
    }
    // Live image preview
    if (field === "photoUrl" && value) {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createProduct({
        name: formData.name.trim(),
        photoUrl: formData.photoUrl.trim() || undefined,
        totalStock: parseInt(formData.totalStock),
        price: parseFloat(formData.price),
        endTime: new Date(formData.endTime).toISOString(),
      });

      toast.success("Sneaker created successfully! 🎉");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium text-sm">Back to Drops</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles size={14} className="text-violet-400" />
            <span>Admin Panel</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-10 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Plus size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Add New Sneaker
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">
                Create a new limited-edition drop for the store
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-6 animate-slide-up"
            style={{animationDelay: "0.1s"}}
          >
            {/* Product Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Type size={14} className="text-blue-400" />
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="e.g. Nike Boost 350 V2 'Slate'"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 ${
                  errors.name
                    ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50"
                    : "border-white/10 hover:border-white/20"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <ImageIcon size={14} className="text-violet-400" />
                Photo URL
                <span className="text-xs text-gray-500 font-normal">
                  (optional)
                </span>
              </label>
              <input
                id="product-photo-url"
                type="url"
                placeholder="https://example.com/sneaker.jpg"
                value={formData.photoUrl}
                onChange={(e) => handleChange("photoUrl", e.target.value)}
                className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 transition-all duration-300 focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 ${
                  errors.photoUrl
                    ? "border-red-500/50"
                    : "border-white/10 hover:border-white/20"
                }`}
              />
              {errors.photoUrl && (
                <p className="text-xs text-red-400 mt-1">{errors.photoUrl}</p>
              )}
            </div>

            {/* Price & Stock row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <DollarSign size={14} className="text-emerald-400" />
                  Price (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                  <input
                    id="product-price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="350.00"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className={`w-full h-12 pl-8 pr-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 ${
                      errors.price
                        ? "border-red-500/50"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-400 mt-1">{errors.price}</p>
                )}
              </div>

              {/* Total Stock */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <Layers size={14} className="text-amber-400" />
                  Total Stock
                </label>
                <input
                  id="product-stock"
                  type="number"
                  min="1"
                  placeholder="10"
                  value={formData.totalStock}
                  onChange={(e) => handleChange("totalStock", e.target.value)}
                  className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 transition-all duration-300 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 ${
                    errors.totalStock
                      ? "border-red-500/50"
                      : "border-white/10 hover:border-white/20"
                  }`}
                />
                {errors.totalStock && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.totalStock}
                  </p>
                )}
              </div>
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Calendar size={14} className="text-pink-400" />
                Drop End Time
              </label>
              <input
                id="product-end-time"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 transition-all duration-300 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/50 [color-scheme:dark] ${
                  errors.endTime
                    ? "border-red-500/50"
                    : "border-white/10 hover:border-white/20"
                }`}
              />
              {errors.endTime && (
                <p className="text-xs text-red-400 mt-1">{errors.endTime}</p>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 hover:from-blue-400 hover:via-violet-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] border-0 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Create Sneaker Drop
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Live Preview */}
          <div
            className="lg:col-span-2 animate-slide-up"
            style={{animationDelay: "0.2s"}}
          >
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Live Preview
              </p>
              <div className="rounded-2xl overflow-hidden glass-card">
                {/* Preview image */}
                <div className="aspect-[4/3] bg-gray-900/50 overflow-hidden relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                      <ImageIcon size={40} strokeWidth={1.5} />
                      <p className="text-xs mt-2 text-gray-500">
                        Image preview
                      </p>
                    </div>
                  )}

                  {/* Stock badge preview */}
                  {formData.totalStock && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border bg-emerald-500/20 border-emerald-500/30 text-emerald-300">
                      <Package size={12} />
                      {formData.totalStock} left
                    </div>
                  )}
                </div>

                {/* Preview content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white font-bold text-base leading-tight">
                      {formData.name || (
                        <span className="text-gray-600">Sneaker Name</span>
                      )}
                    </h3>
                    <div className="mt-2">
                      <span className="text-2xl font-extrabold gradient-text">
                        $
                        {formData.price
                          ? parseFloat(formData.price).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>

                  {/* Stock bar preview */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                      <span>Availability</span>
                      <span>
                        {formData.totalStock || "0"}/
                        {formData.totalStock || "0"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                        style={{width: formData.totalStock ? "100%" : "0%"}}
                      />
                    </div>
                  </div>

                  {/* Preview button */}
                  <div className="pt-1">
                    <div className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm gap-2">
                      <Zap size={14} />
                      Reserve Now
                    </div>
                  </div>
                </div>
              </div>

              {/* Info tip */}
              <div className="mt-4 px-4 py-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-xs text-blue-300/70 leading-relaxed">
                  💡 The available stock will automatically match the total
                  stock when the product is created. Stock decreases as
                  customers reserve and purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
