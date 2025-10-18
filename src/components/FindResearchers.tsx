"use client";

import { useState } from "react";
import { Search, ChevronDown, Trash, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

type User = {
  id: number;
  name: string;
  university: string;
  avatar: string;
};

export default function FindResearchers({
  onSelect,
}: {
  onSelect?: (user: User | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // ✅ store full user object

  const users: User[] = [
    {
      id: 1,
      name: "Dr. Ada Lovelace",
      university: "University of Computing",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Elon Turing",
      university: "AI Research Institute",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Marie Curie",
      university: "Paris Science Academy",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 4,
      name: "Nikola Tesla",
      university: "Electrical Innovations Lab",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      id: 5,
      name: "Grace Hopper",
      university: "Code University",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
  ];

  // Filter logic
  const filtered =
    query || showSuggestions
      ? users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // ✅ Toggle single user selection
  const handleSelect = (id: number) => {
    const user = users.find((u) => u.id === id) || null;
    const newUser = selectedUser?.id === id ? null : user;

    setSelectedUser(newUser);
    setShowSuggestions(false);
    onSelect?.(newUser); // send full user object to parent
  };

  // ✅ Remove selected user
  const handleRemove = () => {
    setSelectedUser(null);
    onSelect?.(null);
  };

  return (
    <div className="relative w-full">
      <h3 className="text-[16px] font-normal font-poppins mb-4">
        Find Researchers
      </h3>

      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search researchers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="pl-10 pr-10 py-6"
        />
        <ChevronDown
          onClick={() => {
            setShowSuggestions((prev) => !prev);
            if (!showSuggestions && !query) setQuery("");
          }}
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer transition-transform duration-300 ${
            showSuggestions ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* ✅ Selected User */}
      {selectedUser && (
        <div className="flex flex-wrap gap-2 mt-3">
          <div
            key={selectedUser.id}
            className="flex items-center justify-between w-full bg-[#ECFDF3] border border-green-200 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full object-cover border border-[#039855] border-1"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {selectedUser.name}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedUser.university}
                </p>
              </div>
            </div>
            <Trash
              className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={handleRemove}
            />
          </div>
        </div>
      )}

      {/* ✅ Suggestions Dropdown */}
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-[100%] mt-2 left-0 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-y-auto z-50">
          {filtered.map((user) => {
            const isSelected = selectedUser?.id === user.id;
            return (
              <div
                key={user.id}
                onClick={() => handleSelect(user.id)}
                className={`flex items-center justify-between gap-3 p-3 hover:bg-gray-100 transition-colors cursor-pointer ${
                  isSelected ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      @{user.university}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Check className="w-5 h-5 text-transparent" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
