import React from 'react';
import SpaceList from './space/SpaceList';
import Sidebar from './Sidebar';

const Sources: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-96 md:min-h-screen md:border-b-0 md:border-r  bg-white border-b  border-gray-200 p-6">
          <Sidebar />
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-start py-8 px-4 md:px-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">NASA Space Images</h1>
          {/* Centered SpaceList */}
          <div className="w-full max-w-6xl mb-8">
            <SpaceList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sources; 