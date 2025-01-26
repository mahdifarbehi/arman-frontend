import React, { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PageSize = 10;

function CustomPagination({
  totalCount,
  onPageChange,
}: {
  totalCount: number;
  onPageChange: (limit: number, offset: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalCount / PageSize);

  const offset = (currentPage - 1) * PageSize;

  useEffect(() => {
    onPageChange(PageSize, offset);
  }, [currentPage, onPageChange, offset]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem
          key={i}
          onClick={() => setCurrentPage(i)}
          className={
            i === currentPage
              ? "bg-primary rounded-xl font-bold text-white hover:bg-primary hover:text-white"
              : ""
          }
        >
          <PaginationLink href="#">{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePreviousPage}
            isActive={currentPage > 1}
          />
        </PaginationItem>

        {/* Pagination Items */}
        {renderPaginationItems()}

        {/* Ellipsis if necessary */}
        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNextPage}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default CustomPagination;
