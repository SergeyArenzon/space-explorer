import { Button } from '../ui/button'
import type { HistoryItem as HistoryItemType } from '../../types/history.interface';
import { Trash, History } from 'lucide-react';
import { usePaginationStore } from '@/store/paginationStore';

const HistoryItem = ({history}: {history: HistoryItemType}) => {
    const { setPagination, setQuery  } = usePaginationStore();

    const viewHandler = () => {
        alert(history.query);
    }

    const deleteHandler = () => {
        ;
    }

  return (
    <div className='relative group w-full flex justify-between gap-1 items-center overflow-visible'>
        <Trash 
        className='absolute left-0 group-hover:stroke-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-[-120%] transition-all duration-300 cursor-pointer text-red-500 hover:text-red-600 z-10' 
        onClick={(e) => {
            e.stopPropagation();
            alert('Delete history');
        }}
        />
        <Button variant="ghost" onClick={() => viewHandler()} className=' flex-1 group transition-all  group-hover:text-lg group-hover:bg-transparent  flex justify-start pl-2' size="sm">
            <h3 className='flex items-center gap-1'><span>{history.query}</span> <History size={10} className='w-4 h-4'/></h3>
        </Button>
    </div>
  )
}

export default HistoryItem