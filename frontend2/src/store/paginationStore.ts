import { create } from 'zustand';
import type { Pagination } from '@/types/pagination.type';

interface PaginationState {
  pagination: Pagination;
  q: string;
  setPagination: (pagination: Pagination) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setItems: (items: Pagination['items']) => void;
  setQuery: (q: string) => void;
  reset: () => void;
}

// Get initial page from URL or default to 1
const getInitialPage = (): number => {
  if (typeof window === 'undefined') return 1;
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || '1', 10);
  return page > 0 ? page : 1;
};

// Get initial page size (default to 6, no longer read from URL)
const getInitialPageSize = (): number => {
  return 6;
};

// Get initial query from URL or default to empty string
const getInitialQuery = (): string => {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get('q') || '';
};

const initialPagination: Pagination = {
  page: getInitialPage(),
  page_size: getInitialPageSize(),
  total: 0,
  total_pages: 0,
  items: [],
};

const resetPagination: Pagination = {
  page: 1,
  page_size: 6,
  total: 0,
  total_pages: 0,
  items: [],
};

export const usePaginationStore = create<PaginationState>((set) => ({
  pagination: initialPagination,
  q: getInitialQuery(),
  
  setPagination: (pagination) => set({ pagination }),
  
  setPage: (page) => set((state) => ({
    pagination: { ...state.pagination, page }
  })),
  
  setPageSize: (pageSize) => set((state) => ({
    pagination: { ...state.pagination, page_size: pageSize }
  })),
  
  setItems: (items) => set((state) => ({
    pagination: { ...state.pagination, items }
  })),
  
  setQuery: (q) => set({ q }),
  
  reset: () => {
    // Reset state to initial values (URL clearing handled by useSpaceSources hook)
    set({ 
      pagination: resetPagination,
      q: ""
    });
  },

}));

