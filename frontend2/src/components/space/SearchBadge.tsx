import { X } from 'lucide-react';
import { Badge } from '../ui/badge'
import { usePaginationStore } from '@/store/paginationStore';

const SearchBadge = () => {
  const { reset, q } = usePaginationStore();
  return (
    <Badge className="w-fit h-8">
      <div>{q}</div>
      <div className='cursor-pointer' onClick={reset}>
        <X className="w-4 h-4 cursor-pointer"/>
      </div>
    </Badge>
  );
}

export default SearchBadge