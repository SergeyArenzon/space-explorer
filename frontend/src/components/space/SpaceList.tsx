
import SpaceCard from './SpaceCard'
import type { SpaceEntity } from '@/types/source.interface'
import { useSpaceSources } from '@/hooks/useSpaceSources';
import { SpacePagination } from './SpacePagination';

const SpaceList = () => {
    const { loading, error, pagination, handlePageChange} = useSpaceSources();
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
      }
      
      if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
      }

  return (
    <div className='flex flex-col gap-3 w-full h-full'>
        
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 h-full overflow-auto">
            {pagination.items.map((image: SpaceEntity) => (
              <div key={image.id} className="w-full h-full max-h-[500px] mx-auto max-w-96">
                <SpaceCard image={image}/>
              </div>
            ))}
        </div>
        {pagination.total_pages > 0 && (
                    <div className=" col-span-full  flex justify-center w-full">
                      <SpacePagination 
                        currentPage={pagination.page} 
                        totalPages={pagination.total_pages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
    </div>

  )
}

export default SpaceList