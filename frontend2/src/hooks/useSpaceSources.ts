import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { usePaginationStore } from '@/store/paginationStore';
import type { Pagination } from '@/types/pagination.type';
import { useScreenSize } from './useScreenSize';
import { useHistoryStore } from '@/store/historyStore';


interface UseSpaceSourcesReturn {
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  handlePageChange: (newPage: number) => void;
  refetch: () => void;
}

// Get page from URL params or default to 1
const getPageFromUrl = (): number => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || '1', 10);
  return page > 0 ? page : 1;
};

// Update URL with new page and query
const updateUrl = (page: number, q: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page.toString());
  if (q) {
    url.searchParams.set('q', q);
  } else {
    url.searchParams.delete('q');
  }
  window.history.pushState({}, '', url.toString());
};

// Clear all URL parameters
const clearUrl = () => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    url.search = ''; // Clear all query parameters
    window.history.pushState({}, '', url.toString());
  }
};

export const useSpaceSources = (): UseSpaceSourcesReturn => {
  const  apiUrl = 'http://localhost:8000/api/sources' 

  // Get pagination state and actions from Zustand store
  const { pagination, setPagination, setPage, q } = usePaginationStore();
  const { addHistoryItem } = useHistoryStore();
  const { isSm, isMd, isLg, isMobile } = useScreenSize();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevQueryRef = useRef<string>(q);



  
  const screenSizeToPageSize = (): number => {
    if (isLg) return 9;
    if (isMd) return 6;
    if (isSm) return 3;
    if (isMobile) return 3;
    return 6;
  }

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const currentPage = getPageFromUrl();

      const currentQuery = usePaginationStore.getState().q;

      const response = await axios.get(
        `${apiUrl}?page=${currentPage}&page_size=${screenSizeToPageSize()}&q=${encodeURIComponent(currentQuery)}`
      );

      // Update Zustand store with the response data
      setPagination(response.data);
      if (response.data.new_history) {
        addHistoryItem(response.data.new_history);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sources:', error);
      setError('Failed to fetch space images');
      setLoading(false);
    }
  }, [setPagination]);

  
  // Reset to page 1 when query changes, or clear URL when reset
  useEffect(() => {

    const currentPagination = usePaginationStore.getState().pagination;
    const queryChanged = prevQueryRef.current !== q;
    
    // If query became empty (reset action) and we're on page 1, clear URL
    if (queryChanged && q === '' && currentPagination.page === 1) {
      clearUrl();
      prevQueryRef.current = q;
    } 
    // If query changed (not on initial mount), update URL and reset to page 1
    else if (queryChanged) {
      updateUrl(1, q);
      setPage(1);
      prevQueryRef.current = q;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // Fetch data when page or query changes
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, q]);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    const currentPagination = usePaginationStore.getState().pagination;
    const currentQuery = usePaginationStore.getState().q;
    if (newPage >= 1 && currentPagination.total_pages > 0 && newPage <= currentPagination.total_pages) {
      updateUrl(newPage, currentQuery);
      // Update Zustand store
      setPage(newPage);
    }
  };

  return {
    loading,
    error,
    pagination,
    handlePageChange,
    refetch: fetchImages,
  };
};

