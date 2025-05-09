"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// const categories = [
//   "All Categories",
//   "Science",
//   "Technology",
//   "Arts",
//   "Research",
// ];

export default function SearchBar({
  onSearch,
  initialCategory = "All Categories",
  initialQuery = "",
  categories = [],
}: {
  onSearch: (category: string, query: string) => void;
  initialCategory?: string;
  initialQuery?: string;
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleSearch = () => {
    onSearch(selectedCategory, searchTerm);
  };
  //console.log("Selected Category:", categories);
  // Search when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-3xl items-center mx-auto overflow-hidden shadow-md">
      <div className="relative">
        <Select
          onValueChange={setSelectedCategory}
          defaultValue={initialCategory}
        >
          <SelectTrigger className="bg-bg2 text-black text-sm px-4 py-6 border-none rounded-none cursor-pointer hover:bg-bg2/80">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for book title, author, category"
        className="flex-1 px-4 py-3 outline-none w-10 bg-white md:w-full"
      />

      <Button
        onClick={handleSearch}
        className="bg-primary-red px-4 py-6 rounded-none flex items-center justify-center cursor-pointer"
      >
        <Search size={20} color="white" />
      </Button>
    </div>
  );
}
