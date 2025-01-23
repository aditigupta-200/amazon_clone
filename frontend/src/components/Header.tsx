// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useAuth } from '../context/AuthContext';

// import {
//   Search,
//   ShoppingCart,
//   Menu,
//   MapPin,
//   User,
//   Package,
//   Heart,
//   Bell,
//   ChevronDown,
// } from "lucide-react";

// const Header: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const router = useRouter();
//   const { user, logout } = useAuth();

//   const categories = [
//     "Electronics",
//     "Fashion",
//     "Home & Kitchen",
//     "Books",
//     "Toys & Games",
//     "Beauty",
//     "Sports",
//     "Automotive",
//     "Health",
//     "Pet Supplies",
//   ];

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   const handleLogin = () => {
//     router.push("/auth/login");
//   };

//   return (
//     <header className="bg-gray-900 sticky top-0 z-50">
//       {/* Upper Header */}
//       <div className="border-b border-gray-700">
//         <div className="flex items-center h-16">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-white font-bold text-2xl px-4 h-full flex items-center border-r border-gray-700 hover:bg-gray-800 transition-colors"
//           >
//             Amazon
//           </Link>
//           {/* Search Bar */}
//           <form
//             onSubmit={handleSearch}
//             className="flex-1 flex h-10 my-auto mx-4"
//           >
//             <div className="relative flex-1 flex">
//               <select className="px-3 rounded-l-md border-r border-gray-300 bg-gray-100 text-sm hover:bg-gray-200 transition-colors cursor-pointer">
//                 <option>All Categories</option>
//                 {categories.map((cat) => (
//                   <option key={cat}>{cat}</option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 className="w-full px-4 outline-none"
//                 placeholder="Search products, brands and categories..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="bg-yellow-400 hover:bg-yellow-500 px-8 rounded-r-md transition-colors"
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//             </div>
//           </form>


//           {/* Right Section */}
//       <div className="flex h-full">

//              <div className="relative group">
//             <div className="space-x-4">
//           {/* Show username if logged in, otherwise show login button */}
//           {user ? (
//             <>
//               <span className="h-full px-4 text-white border-l border-gray-700 hover:bg-gray-800 transition-colors flex items-center"
//                   >
//                     {user.name}</span>
//               <button onClick={logout} className="px-4 py-2 bg-red-500 rounded">
//                 Logout
//               </button>
//             </>
//           ) : (
           
//               <button
//                 onClick={handleLogin}
//                 className="h-full px-4 text-white border-l border-gray-700 hover:bg-gray-800 transition-colors flex items-center"
//                     >
//                       <div className="text-sm mr-1">
//                   <div className="font-bold flex items-center">
//                           Login
//                         <ChevronDown className="w-4 h-4 ml-1" />
//                          </div>
//                 </div>
//                     </button>
//           )}
//         </div>
            
// {/* Product page */}
//             <Link href="/products"
//               className="h-full px-4 text-white border-l border-gray-700 hover:bg-gray-800 transition-colors flex items-center">
//               Products
//             </Link>

//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="h-full px-6 text-white border-l border-gray-700 hover:bg-gray-800 transition-colors flex items-center"
//             >
//               <div className="relative flex items-center">
//                 <ShoppingCart className="w-6 h-6" />
//                 <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                   {/* {state.items.length} */}
//                 </span>
//                 <span className="font-bold ml-2">Cart</span>
//               </div>
//             </Link>
//           </div>

//         </div>
//       </div>

//       {/* Lower Header - Categories */}
//       <div className="flex items-center bg-gray-800 h-10 overflow-x-auto scrollbar-hide">
//         <button className="flex items-center text-white px-4 h-full hover:bg-gray-700 transition-colors">
//           <Menu className="w-5 h-5 mr-2" />
//           All
//         </button>
//         {categories.map((category) => (
//           <Link
//             key={category}
//             href={`/category/${category.toLowerCase()}`}
//             className="text-white px-4 h-full flex items-center hover:bg-gray-700 transition-colors whitespace-nowrap"
//           >
//             {category}
//           </Link>
//         ))}
//         </div>
//         </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from '../context/AuthContext';

import {
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  Package,
  UserCircle,
} from "lucide-react";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const categories = [
    "Electronics", "Fashion", "Home & Kitchen", "Books", 
    "Toys & Games", "Beauty", "Sports", "Automotive", 
    "Health", "Pet Supplies",
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
    <header className="bg-gray-900 sticky top-0 z-50 shadow-lg">
      {/* Upper Header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between space-y-2 md:space-y-0">
          {/* Logo */}
          <div className="w-full md:w-auto mb-2 md:mb-0">
            <Link
              href="/"
              className="text-white font-bold text-2xl inline-block px-3 py-1 rounded hover:bg-gray-800 transition-colors"
            >
              Amazon
            </Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 w-full order-last md:order-none md:max-w-3xl mx-auto my-2 md:ml-4"
          >
            <div className="relative flex">
              <select className="px-3 py-2 rounded-l-lg border-r border-gray-300 bg-gray-100 text-base hover:bg-gray-200 transition-colors cursor-pointer">
                <option>All Categories</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                className="w-full px-4 py-2 text-base outline-none"
                placeholder="Search Amazon for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-5 rounded-r-lg transition-colors flex items-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between">
            {/* Products Link */}
            <Link
              href="/products"
              className="text-white flex items-center hover:bg-gray-800 px-3 py-2 rounded-lg group text-base"
            >
              <Package className="w-5 h-5 mr-2" />
              <span className="hidden md:inline">Products</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-3 bg-gray-800 p-2 rounded-lg">
                <UserCircle className="text-yellow-400 w-8 h-8" />
                <div>
                  <p className="text-yellow-300 text-xs">Welcome</p>
                  <h3 className="text-white font-bold text-base truncate max-w-[150px]">
                    {user.name}
                  </h3>
                </div>
                <button 
                  onClick={logout} 
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm ml-2 hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="text-white flex items-center text-base hover:bg-gray-800 px-3 py-2 rounded-lg group"
              >
                <UserCircle className="w-6 h-6 mr-2 text-yellow-400" />
                <span className="hidden md:inline">Login</span>
                <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
              </button>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="text-white flex items-center hover:bg-gray-800 px-3 py-2 rounded-lg relative text-base"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-1 bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
              <span className="ml-2 hidden md:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lower Header - Categories */}
      <div className="bg-gray-800 hidden md:block">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex items-center">
            <button className="flex items-center text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors">
              <Menu className="w-4 h-4 mr-2" />
              All
            </button>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 absolute top-full left-0 w-full shadow-lg">
          {/* Mobile menu content remains the same as previous version */}
        </div>
      )}
    </header>
  );
};

export default Header;