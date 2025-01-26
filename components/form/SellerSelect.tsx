"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "use-debounce";
import { fetchSubordinates } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";
interface Seller {
  id: number;
  fullname: string;
}
interface SellersSelectProps {
  onSellerSelect?: (sellerId: string | number) => void;
  selectedId?: string | number;
}

const SellersSelect: React.FC<SellersSelectProps> = ({
  onSellerSelect = () => {},
  selectedId,
}) => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async (search?: string) => {
    const { data, message, success } = await fetchSubordinates(search);
    if (success && data.length !== 0) {
      setSellers((prev) => {
        const existingIds = new Set(prev.map((seller) => seller.id));
        const newSellers = data.filter((seller) => !existingIds.has(seller.id));
        return [...prev, ...newSellers];
      });
    } else {
      toast({ description: message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = useDebouncedCallback(async (value: string) => {
    if (value) {
      fetchData(value);
    }
  }, 500);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };
  const handleSelection = (sellerId: string | number) => {
    onSellerSelect(sellerId); // Pass the selection back to the parent
  };
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="فروشنده موردنظر را انتخاب کنید"
        value={searchValue}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
      />
      {searchValue && (
        <button
          onClick={() => setSearchValue("")}
          className="absolute left-3 top-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      )}
      <Select onValueChange={handleSelection}>
        <SelectTrigger className="opacity-0 absolute top-2">
          <SelectValue placeholder="فروشنده  موردنظر را انتخاب کنید">
            {sellers?.find((seller) => seller.id == selectedId)?.fullname ||
              "فروشنده موردنظر را انتخاب کنید"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {sellers?.map((seller) => (
            <SelectItem key={seller.id} value={seller.id.toString()}>
              {seller.fullname}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SellersSelect;
