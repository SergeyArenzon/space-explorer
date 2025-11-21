import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  interface SpacePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

  export function SpacePagination({ currentPage, totalPages, onPageChange }: SpacePaginationProps) {
    // Calculate which page numbers to show
    const getVisiblePages = (): (number | 'ellipsis')[] => {
      if (totalPages <= 7) {
        // Show all pages if 7 or fewer
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages: (number | 'ellipsis')[] = [];
      
      if (currentPage <= 3) {
        // Near the start: show 1, 2, 3, 4, ..., last
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: show 1, ..., last-3, last-2, last-1, last
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: show 1, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }

      return pages;
    };

    const visiblePages = getVisiblePages();

    const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
      e.preventDefault();
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    };

    const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    if (totalPages <= 1) {
      return null;
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={handlePrevious}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          
          {visiblePages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={handleNext}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  