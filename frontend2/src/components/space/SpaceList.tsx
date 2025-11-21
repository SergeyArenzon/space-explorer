
import SpaceCard from './SpaceCard'
import type { SpaceEntity } from '@/types/source.interface'
import { useSpaceSources } from '@/hooks/useSpaceSources';
import { SpacePagination } from './SpacePagination';

const SpaceList = () => {
    const { loading, error, pagination, handlePageChange } = useSpaceSources();
    console.log({pagination});
    

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
      }
      
      if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
      
    {pagination.items.map((image: SpaceEntity) => (
      <SpaceCard key={image.id}  image={image}/>
    ))}


    {pagination.total_pages > 0 && (
                <div className="col-span-full flex justify-center w-full">
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