import { useCallback, useState } from 'react';

export function useHandleSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const hideSearch = useCallback(function () {
    setIsSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(function () {
    setIsSearchOpen((prev) => !prev);
  }, []);
  return { isSearchOpen, hideSearch, toggleSearch };
}
