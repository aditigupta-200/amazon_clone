import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Search,
  ShoppingCart,
  Menu,
  MapPin,
  User,
  Package,
  Heart,
  Bell,
  ChevronDown,
} from "lucide-react";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Books",
    "Toys & Games",
    "Beauty",
    "Sports",
    "Automotive",
    "Health",
    "Pet Supplies",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <header className="bg-gray-900 sticky top-0 z-50">
      {/* Upper Header */}
      <div className="border-b border-gray-700">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold text-2xl px-4 h-full flex items-center border-r border-gray-700 hover:bg-gray-800 transition-colors"
          >
            Amazon
          </Link>
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 flex h-10 my-auto mx-4"
          >
            <div className="relative flex-1 flex">
              <select className="px-3 rounded-l-md border-r border-gray-300 bg-gray-100 text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                <option>All Categories</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                className="w-full px-4 outline-none"
                placeholder="Search products, brands and categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-8 rounded-r-md transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
          {/* Right Section */}
          <div className="flex h-full">
            {/* Account Dropdown */}
            <div className="relative group">
              <button
                onClick={handleLogin}
                className="h-full px-4 text-white border-l border-gray-700 hover:bg-gray-800 transition-colors flex items-center"
              >
                <div className="text-sm mr-1">
                  <div className="font-bold flex items-center">
                    Login
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </button>
              {/* Dropdown content can be added here */}
            </div>
{/* Product page */}
            <Link href="/products"
              className="h-full px-4 text-white border-l border-gray-700 hover:bg-gray-800 transition-colors flex items-center">
              Products
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="h-full px-6 text-white border-l border-gray-700 hover:bg-gray-800 transition-colors flex items-center"
            >
              <div className="relative flex items-center">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {/* {state.items.length} */}
                </span>
                <span className="font-bold ml-2">Cart</span>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Lower Header - Categories */}
      <div className="flex items-center bg-gray-800 h-10 overflow-x-auto scrollbar-hide">
        <button className="flex items-center text-white px-4 h-full hover:bg-gray-700 transition-colors">
          <Menu className="w-5 h-5 mr-2" />
          All
        </button>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category.toLowerCase()}`}
            className="text-white px-4 h-full flex items-center hover:bg-gray-700 transition-colors whitespace-nowrap"
          >
            {category}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;