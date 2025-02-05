import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { Product } from "../types/product";
import { getProducts } from "../utils/api";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";

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
	const [cart, setCart] = useState<{ [key: string]: number }>({});
	const { items, addItem } = useCart();
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [cartItemCount, setCartItemCount] = useState(0);

	useEffect(() => {
		setCartItemCount(
			items.reduce((total, item) => total + item.quantity, 0)
		);
	}, [items]);

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
		const query = encodeURIComponent(searchQuery);
		const category = encodeURIComponent(selectedCategory);
		router.push(`/search?q=${query}&category=${category}`);
	};

	const handleAddToCart = (product: Product) => {
		if (!user) {
			router.push("/auth/login");
			return;
		}
		setCart((prevCart) => {
			const productId = product._id ? product._id.toString() : "unknown";
			return {
				...prevCart,
				[productId]: (prevCart[productId] || 0) + 1,
			};
		});
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
							<select
								value={selectedCategory}
								onChange={(e) =>
									setSelectedCategory(e.target.value)
								}
								className="px-3 py-2 rounded-l-lg border-r border-gray-300 bg-gray-100 text-base"
							>
								<option value="">All Categories</option>
								{categories.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
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

						{!user ? (
							<button
								onClick={handleLogin}
								className="text-white px-3 py-2 rounded-lg"
							>
								Login
							</button>
						) : (
							<div className="flex items-center space-x-3 bg-gray-800 p-2 rounded-lg">
								<UserCircle className="text-yellow-400 w-8 h-8" />
								<div>
									<p className="text-yellow-300 text-xs">
										Welcome
									</p>
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
						)}

						<Link
							href="/cart"
							className="text-white flex items-center hover:bg-gray-800 px-3 py-2 rounded-lg relative text-base"
						>
							<ShoppingCart className="h-5 w-5" />
							<span className="ml-2 hidden md:inline">
								Cart
								<span className="absolute -top-2 -right-1 bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
									{cartItemCount > 0 && (
										<Badge
											variant="secondary"
											className="ml-1 bg-white text-green-600"
										>
											{cartItemCount}
										</Badge>
									)}
								</span>
							</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Lower Header - Categories */}
			<div className="bg-gray-800">
				<div className="container mx-auto px-4 py-2">
					<div className="flex items-center">
						{/* <select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="text-white bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mr-4"
						>
							<option value="">All Categories</option>
							{categories.map((cat) => (
								<option key={cat} value={cat}>{cat}</option>
							))}
						</select> */}
						<Link href={`/search?q=&category=All%20Categories`}>
							<button className="flex items-center text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors">
								All
							</button>
						</Link>
						{categories.map((category) => (
							<Link
								key={category}
								href={`/search?q=&category=${category}`}
								className="text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors whitespace-nowrap"
							>
								{category}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={isMobileMenuOpen ? "block" : "hidden"}>
				<div className="md:hidden bg-gray-900 absolute top-full left-0 w-full shadow-lg">
					{/* Mobile menu content remains the same as previous version */}
				</div>
			</div>
		</header>
	);
};

export default Header;
