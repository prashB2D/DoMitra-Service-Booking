import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { indianCities } from "../data/mockData";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Hassan, Karnataka");

  const handleSearch = () => {
    onSearch(query, location);
  };

  return (
    <div className="flex gap-3 items-center bg-white p-4 rounded-lg shadow-md">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search for services (e.g., plumber)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border-gray-300"
        />
      </div>

      <div className="w-64">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="border-gray-300">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {indianCities.map((loc) => (
              <SelectItem
                key={`${loc.city}-${loc.state}`}
                value={`${loc.city}, ${loc.state}`}
              >
                {loc.city}, {loc.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSearch} className="px-6">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
}
