import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function GeneralCompPagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems: Array<number | 'ellipsis'> = [];

  if (totalPages <= 7) {
    for (let index = 1; index <= totalPages; index += 1) {
      pageItems.push(index);
    }
  } else {
    pageItems.push(1);

    if (currentPage > 4) {
      pageItems.push('ellipsis');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let index = startPage; index <= endPage; index += 1) {
      pageItems.push(index);
    }

    if (currentPage < totalPages - 3) {
      pageItems.push('ellipsis');
    }

    pageItems.push(totalPages);
  }

  return (
    <nav
      className={`flex items-center justify-center gap-2 pt-6 ${className}`.trim()}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={16} />
      </button>

      {pageItems.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-sm text-slate-400">
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-9 min-w-9 items-center justify-center px-3 text-sm font-medium transition ${
              isActive
                ? 'bg-violet-600 text-white shadow-sm'
                : 'border border-slate-200 text-slate-600 hover:border-violet-400 hover:text-violet-600'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
