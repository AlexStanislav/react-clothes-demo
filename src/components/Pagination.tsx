import "@/assets/css/components/Pagination.css";
import { useState } from "react";

interface PaginationProps {
  totalRows: number;
  onPageChange: (page: number) => void;
}
function Pagination({ totalRows, onPageChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  return (
    <div className="pagination">
      {Array.from({ length: totalRows }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={
              page === currentPage
                ? "pagination__button pagination__button--active"
                : "pagination__button"
            }
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}

export default Pagination;
