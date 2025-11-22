import { useState } from 'react'

const CardDescription = ({ description }: { description: string }) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false)

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 px-2 py-2 text-xs text-white italic bg-black/60 ${isDescExpanded ? 'max-h-32 overflow-y-auto overflow-x-hidden' : ''}`}
      onMouseLeave={() => {
        if (isDescExpanded) {
          setIsDescExpanded(false);
        }
      }}
    >
      <p className={`${isDescExpanded ? 'wrap-break-word' : 'line-clamp-2'}`}>{description}</p>
      {description.length > 100 && (
        <button
          className="mt-1 text-xs underline hover:text-gray-300 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsDescExpanded(!isDescExpanded);
          }}
        >
          {isDescExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

export default CardDescription