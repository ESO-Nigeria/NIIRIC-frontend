"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, ChevronDown, Trash, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Profile } from "../types/profile";
import axios from "axios";

type User = {
  id?: string;
  name?: string;
  university?: string;
  avatar?: string;
};

export default function FindResearchers({
  onSelect,
  selectedUser,
  publishers,
}: {
  onSelect?: (user: User | null) => void;
  selectedUser?: User | null;
  publishers?: Profile[] | null;
}) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Convert publishers to user-like objects
  const publisherUsers: User[] =
    publishers?.map((pub) => ({
      id: pub.user,
      name: `${pub.first_name} ${pub?.last_name}`,
      // university: pub.university || "Unknown University",
      avatar: pub.profile_pic || "https://i.pravatar.cc/40?u=publisher",
    })) ?? [];

  // 🔹 Combined list
  const combinedUsers = [...publisherUsers, ...remoteUsers];

  // 🔹 Filter local/publisher users
  const filtered =
    query || showSuggestions
      ? combinedUsers?.filter((user) =>
          user?.name?.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // 🔹 Fetch remote users (with pagination)
  const fetchUsers = useCallback(
    async (reset = false) => {
      if (!query.trim()) {
        setRemoteUsers([]);
        setPage(1);
        setHasMore(true);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(`/api/researchers`, {
          params: { query, page },
        });

        const fetched = Array.isArray(data?.results || data)
          ? (data.results || data).map((u: any) => ({
              id: u.id,
              name: u.name,
              university: u.university || "Unknown",
              avatar: u.avatar || "https://i.pravatar.cc/40?u=api",
            }))
          : [];

        setRemoteUsers((prev) =>
          reset ? fetched : [...prev, ...fetched.filter((u: any) => !prev.find((p) => p.id === u.id))]
        );
        setHasMore(data?.next !== null && fetched.length > 0);
      } catch (error) {
        console.error("Error fetching researchers:", error);
      } finally {
        setLoading(false);
      }
    },
    [query, page]
  );

  // 🔹 Handle query change (debounced)
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchUsers(true);
    }, 400);
    return () => clearTimeout(delay);
  }, [query, fetchUsers]);

  // 🔹 Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  // 🔹 Load next page when `page` increases
  useEffect(() => {
    if (page > 1) fetchUsers();
  }, [page, fetchUsers]);

  const handleSelect = (id: any) => {
    const user = combinedUsers?.find((u) => u.id === id) || null;
    onSelect?.(user);
    setShowSuggestions(false);
  };

  const handleRemove = () => onSelect?.(null);

  console.log('publishers', publishers, combinedUsers)

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
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
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

      {/* Selected User */}
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
                className="w-10 h-10 rounded-full object-cover border border-[#039855]"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {selectedUser.name}
                </p>
                {/* <p className="text-xs text-gray-500">
                  {selectedUser.university}
                </p> */}
              </div>
            </div>
            <Trash
              className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={handleRemove}
            />
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-[100%] mt-2 left-0 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-y-auto z-50">
          {loading && page === 1 ? (
            <p className="p-3 text-sm text-gray-500 flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Searching...
            </p>
          ) : filtered?.length > 0 ? (
            <>
              {filtered?.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <div
                    key={user.id}
                    onMouseDown={() => handleSelect(user.id)}
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
                        <p className="text-[14px] font-medium capitalize text-gray-800">
                          {user.name}
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
              <div ref={observerRef} className="flex justify-center py-2">
                {loading && page > 1 ? (
                  <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
                ) : (
                  hasMore && (
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setPage((p) => p + 1);
                      }}
                      className="text-xs text-green-600 hover:underline"
                    >
                      Load more
                    </button>
                  )
                )}
              </div>
            </>
          ) : (
            <p className="p-3 text-sm text-gray-500">No researchers found</p>
          )}
        </div>
      )}
    </div>
  );
}
 