"use client";
import { Input } from "../ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState<string>(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    if (!searchParams.get("search")) setSearch("");
  }, [searchParams]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>جستجو</Label>
      <div className="flex gap-2  items-center">
        <Input
          type="search"
          className="max-w-[200px]"
          placeholder="جستجو کنید..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      <Button onClick={handleSearch} className="w-32">
        جستجو
      </Button>
      </div>
    </div>
  );
}

export default Search;
