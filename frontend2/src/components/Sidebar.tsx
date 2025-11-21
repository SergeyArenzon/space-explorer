import HistoryList from './history/HistoryList';
import SearchInput from './SearchInput'

const Sidebar = () => {


  return (
    <div className='flex flex-col gap-3 '>
        <SearchInput 
        placeholder="Search for a space image" />
      
        <HistoryList/>
    </div>)
}

export default Sidebar