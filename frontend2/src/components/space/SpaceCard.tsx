import { useState } from 'react'
import type { SpaceEntity } from '@/types/source.interface'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Confidence from './Confidence'
import FullScreenCard from './FullScreenCard'
import { Skeleton } from '../ui/skeleton'
import CardDescription from './CardDescription'

const SpaceCard = ({ image }: { image: SpaceEntity }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false)

  const openFullScreen = () => setIsFullScreen(true)
  const closeFullScreen = () => setIsFullScreen(false)

  return (
    <>
      <Card className="w-full h-full max-w-xs sm:max-w-sm m:h-72 md:h-80 overflow-hidden  flex flex-col text-base sm:text-lg md:text-xl hover:bg-primary/2 hover:shadow-lg transition-all duration-300">
        <CardHeader  className="shrink-0">
          {image.confidence && <Confidence confidence={image.confidence} />}
          <CardTitle className="line-clamp-1">{image.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 overflow-hidden relative px-0">        
          <span className="absolute text-white top-0 right-0 text-xs mr-1 mt-1 bg-black/60 ">
            {image.launch_date && new Date(image.launch_date).toLocaleDateString()} 
          </span>
  
          {imageLoading && <Skeleton className="w-full h-full" />}
          <img 
          src={image.image_url} 
          onLoad={() => setImageLoading(false)}
          alt={image.name} 
          className="w-full h-32 sm:h-40 md:h-48 object-cover" />
          {image.description && 
          <CardDescription description={image.description}  />}
        </CardContent>
        <CardFooter className="flex-col gap-2 shrink-0">
          <Button variant={"outline"} className="w-full" onClick={openFullScreen}>View Full Image</Button>
        </CardFooter>
      </Card>

      {isFullScreen && <FullScreenCard image={image} closeFullScreenCB={closeFullScreen} />}
    </>
  )
}


export default SpaceCard