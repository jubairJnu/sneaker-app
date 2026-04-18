import {Plus, Wifi, WifiOff} from "lucide-react";
import {Link} from "react-router-dom";

interface HeaderProps {
  isConnected: boolean;
}

export function Header({isConnected}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              SD
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              SNEAKER
              <span className="gradient-text ml-1">DROP</span>
            </h1>
          </Link>
          <div className="hidden sm:block text-xs text-gray-500 border-l border-white/10 pl-4 ml-2">
            Exclusive Limited Editions
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Add Product Link */}
          <Link
            to="/create"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-600 rounded-lg hover:from-blue-400 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 hover:scale-[1.03] active:scale-[0.97]"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add Drop</span>
          </Link>

          {/* Connection status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
            <div className="relative">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-emerald-400" : "bg-red-500"
                }`}
              />
              {isConnected && (
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                isConnected ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {isConnected ? "Live" : "Offline"}
            </span>
            {isConnected ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-red-400" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
