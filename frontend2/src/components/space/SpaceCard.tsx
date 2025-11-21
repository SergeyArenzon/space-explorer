import type { SpaceEntity } from '@/types/source.interface'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const SpaceCard = ({ image }: { image: SpaceEntity }) => {
  return (
    <Card className="w-full max-w-sm h-96 overflow-hidden flex flex-col text-xl">
      <CardHeader  className="shrink-0">
        <CardTitle>{image.name}</CardTitle>
        <CardDescription className="line-clamp-3 italic">{image.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 overflow-hidden">
        <img loading="lazy" src={image.image_url} alt={image.name} className="w-full h-48 object-cover" />
        {image.launch_date && new Date(image.launch_date).toLocaleDateString()}
      </CardContent>
      <CardFooter className="flex-col gap-2 shrink-0">
        <Button variant={"outline"} className="w-full">View Full Image</Button>
      </CardFooter>
    </Card>
  )
}


export default SpaceCard