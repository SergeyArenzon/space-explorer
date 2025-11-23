import React from 'react';
import SpaceList from './space/SpaceList';
import Sidebar from './Sidebar';
import SearchBadge from './space/SearchBadge';
import { usePaginationStore } from '@/store/paginationStore';

const Sources: React.FC = () => {
  const { q } = usePaginationStore();
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-72 md:min-h-screen md:border-b-0 md:border-r  bg-white border-b  border-gray-200 p-6 ">
          <Sidebar />
        </aside>
        
        {/* Main Content Area */}
        <main className="relative flex-1 flex flex-col items-center justify-start py-1 px-4 md:px-6 sm:py-8">
          <div className="relative text-2xl md:text-3xl font-bold text-center w-full flex items-center justify-center">     
          <div className="absolute left-0 flex items-center h-full">
            {q && <SearchBadge/>}
          </div>
            <h1>NASA Space Images</h1>
          </div>
          {/* Centered SpaceList */}
          <div className="w-full max-w-6xl mb-8 flex-1 flex flex-col h-full overflow-hidden">
            <SpaceList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sources; 