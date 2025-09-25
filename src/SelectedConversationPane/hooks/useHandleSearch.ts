import { useCallback, useState } from 'react';
import { SelectedConversationPaneProps } from '../types';

export function useHandleSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function hideSearch() {
    setIsSearchOpen(false);
  }

  function toggleSearch() {
    setIsSearchOpen((prev) => !prev);
  }
  return { isSearchOpen, hideSearch, toggleSearch };
}
