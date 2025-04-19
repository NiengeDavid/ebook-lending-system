"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "All Categories",
  "Science",
  "Technology",
  "Arts",
  "Research",
]; // Add more as needed

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // You can route or call a search API here
    console.log("Search:", { selectedCategory, searchTerm });
  };

  return (
    <div className="flex w-full max-w-3xl items-center mx-auto overflow-hidden shadow-md">
      {/* Category Dropdown */}

      <div className="relative">
        {/* Category Dropdown */}
        <Select
          onValueChange={(value) => setSelectedCategory(value)}
          defaultValue="All Categories"
        >
          <SelectTrigger className="bg-bg2 text-black text-sm px-4 py-6 border-none rounded-none cursor-pointer hover:bg-bg2/80">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for book title, author, category"
        className="flex-1 px-4 py-3 outline-none w-10 bg-white md:w-full"
      />

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="bg-primary-red px-4 py-6 rounded-none flex items-center justify-center cursor-pointer"
      >
        <Search size={20} color="white" />
      </Button>
    </div>
  );
}
