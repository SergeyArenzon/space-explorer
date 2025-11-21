import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { usePaginationStore } from '@/store/paginationStore';
import type { Pagination } from '@/types/pagination.type';

interface UseSpaceSourcesOptions {
  pageSize?: number;
  apiUrl?: string;
}

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

// Update URL with new page, pageSize, and query
const updateUrl = (page: number, pageSize: number, q: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page.toString());
  url.searchParams.set('page_size', pageSize.toString());
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

export const useSpaceSources = (
  options: UseSpaceSourcesOptions = { pageSize: 6, apiUrl: 'http://localhost:8000/api/sources'}
): UseSpaceSourcesReturn => {
  const { pageSize = 6, apiUrl = 'http://localhost:8000/api/sources' } = options;

  // Get pagination state and actions from Zustand store
  const { pagination, setPagination, setPage, q } = usePaginationStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevQueryRef = useRef<string>(q);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const currentPage = getPageFromUrl();
      const currentPagination = usePaginationStore.getState().pagination;
      const currentQuery = usePaginationStore.getState().q;

      const response = await axios.get(
        `${apiUrl}?page=${currentPage}&page_size=${currentPagination.page_size}&q=${encodeURIComponent(currentQuery)}`
      );

      // Update Zustand store with the response data
      setPagination(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sources:', error);
      setError('Failed to fetch space images');
      setLoading(false);
    }
  }, [setPagination, apiUrl]);

  
  // Reset to page 1 when query changes, or clear URL when reset
  useEffect(() => {
    console.log("[][][][][]");
    
    const currentPagination = usePaginationStore.getState().pagination;
    const queryChanged = prevQueryRef.current !== q;
    
    // If query became empty (reset action) and we're on page 1 with default page size, clear URL
    if (queryChanged && q === '' && currentPagination.page === 1 && (currentPagination.page_size === 6 || currentPagination.page_size === 0)) {
      clearUrl();
      prevQueryRef.current = q;
    } 
    // If query changed (not on initial mount), update URL and reset to page 1
    else if (queryChanged) {
      const currentPageSize = currentPagination.page_size || pageSize;
      updateUrl(1, currentPageSize, q);
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
      updateUrl(newPage, pageSize, currentQuery);
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

