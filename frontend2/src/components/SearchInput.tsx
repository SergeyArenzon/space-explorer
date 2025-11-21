import { useState, useEffect } from 'react'
import { Search, CircleX } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { usePaginationStore } from '@/store/paginationStore'

interface SearchInputProps {
  placeholder?: string
}

export default function SearchInput({
  placeholder = 'Search...',
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { q, setQuery, reset } = usePaginationStore();

  // Sync local state with store
  useEffect(() => {
    setSearchValue(q);
  }, [q]);

  return (
    <div className="relative">
      <div
        className={`relative flex items-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
          isFocused
            ? 'border-primary bg-card shadow-lg shadow-primary/10'
            : 'border-border bg-background hover:border-border/80'
        }`}
      >
        {/* Search Icon */}
        <Search
          className={`w-5 h-5 shrink-0 transition-colors ${
            isFocused ? 'text-primary' : 'text-muted-foreground'
          }`}
        />

        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 border-0 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-lg shadow-none focus-visible:ring-0"
        />


        { searchValue && <CircleX onClick={reset} className='w-4 mr-1 h-4 cursor-pointer' />}

        <Button  
        size="sm" 
        variant="static" 
        onClick={() => setQuery(searchValue)} 
        className="shrink-0 h-auto p-1" 
        aria-label="Clear search">Search</Button>

      </div>

      {/* Focus Indicator Line */}
      {isFocused && (
        <div className="absolute left-0 right-0 h-0.5  from-primary via-primary to-transparent rounded-full" />
      )}
    </div>
  )
}
