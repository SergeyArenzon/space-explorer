import { useState } from 'react';
import HistoryList from './history/HistoryList';
import SearchInput from './SearchInput'
import { Button } from './ui/button';
import { useScreenSize } from '../hooks/useScreenSize';

const Sidebar = () => {
  const { isMd } = useScreenSize();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // On desktop screens, history is always visible regardless of toggle state
  const shouldShowHistory = isMd || isHistoryOpen;

  return (
    <div className='flex flex-col gap-3 relative'>
        <SearchInput 
        placeholder="Search for a space image" />
      
        <Button
          variant="ghost"
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="md:hidden text-left text-lg font-bold mb-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          Recent {isHistoryOpen ? '▼' : '▶'}
        </Button>
      
        {shouldShowHistory && (
          <div className={`${!isMd ? 'absolute top-full left-0 right-0 z-50 bg-background border border-border rounded-md shadow-lg p-4 mt-2' : ''}`}>
            <HistoryList />
          </div>
        )}
    </div>)
}

export default Sidebar