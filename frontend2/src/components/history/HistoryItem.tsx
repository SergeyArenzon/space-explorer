import { Button } from '../ui/button'
import type { HistoryItem as HistoryItemType } from '../../types/history.interface';
import { Trash, History } from 'lucide-react';
import { usePaginationStore } from '@/store/paginationStore';

const HistoryItem = ({history, deleteHandler}: {history: HistoryItemType, deleteHandler: (id: string) => void}) => {
    const { setPagination, setQuery  } = usePaginationStore();


    const viewHandler = () => {
        alert(history.q);
    }


  return (
    <div className='relative group w-full flex justify-between gap-1 items-center overflow-visible'>
        <Trash 
        className='absolute left-0 group-hover:stroke-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-[-120%] transition-all duration-300 cursor-pointer text-red-500 hover:text-red-600 z-10' 
        onClick={() => deleteHandler(history.q)}
        />
        <Button variant="ghost" onClick={() => viewHandler()} className=' flex-1 group transition-all  group-hover:text-lg group-hover:bg-transparent  flex justify-start pl-2' size="sm">
            <h3 className='flex items-center gap-1'><span>{history.q} <i className='text-xs text-gray-500'>({history.total} items)</i></span> <History size={10} className='w-4 h-4'/></h3>
        </Button>
    </div>
  )
}

export default HistoryItem