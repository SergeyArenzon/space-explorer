import type { ScreenSize } from "./useScreenSize";

// Get page from URL params or default to 1
export const getPageFromUrl = (): number => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page') || '1', 10);
    return page > 0 ? page : 1;
  };
  
  // Update URL with new page and query
  export const updateUrl = (page: number, q: string) => {
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
export  const clearUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.search = ''; // Clear all query parameters
      window.history.pushState({}, '', url.toString());
    }
  };

export const screenSizeToPageSize = (screenSizes: ScreenSize): number => {
    if (screenSizes.isLg) return 6;
    if (screenSizes.isMd) return 4;
    if (screenSizes.isSm) return 2;
    if (screenSizes.isMobile) return 2;
    return 6;
  }
