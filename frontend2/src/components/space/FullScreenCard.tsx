import type { SpaceEntity } from "@/types/source.interface"
import { X } from "lucide-react"

const FullScreenCard = ({ image, closeFullScreenCB }: { image: SpaceEntity, closeFullScreenCB: () => void })=> {
  
    return (
    <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeFullScreenCB}
        >
          <button
            onClick={closeFullScreenCB}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close full screen"
          >
            <X className="w-8 h-8 cursor-pointer" />
          </button>
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={image.image_url} 
              alt={image.name} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
              <h3 className="font-semibold text-lg">{image.name}</h3>
              {image.description && (
                <p className="text-sm mt-1 opacity-90">{image.description}</p>
              )}
            </div>
          </div>
        </div>
  )
}

export default FullScreenCard