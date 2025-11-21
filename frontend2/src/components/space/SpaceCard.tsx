import type { SpaceEntity } from '@/types/source.interface'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const SpaceCard = ({ image }: { image: SpaceEntity }) => {
  const confidence = image.confidence ?? 0

  // Determine color based on confidence level
  const getConfidenceColor = (score: number) => {
    if (score >= 71) return 'bg-green-500'
    if (score >= 41) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // Determine text color for badge
  const getTextColor = (score: number) => {
    if (score >= 71) return 'text-green-700 bg-green-100'
    if (score >= 41) return 'text-yellow-700 bg-yellow-100'
    return 'text-red-700 bg-red-100'
  }

  return (
    <Card className="w-full max-w-xs sm:max-w-sm h-64 sm:h-72 md:h-80 overflow-hidden  flex flex-col text-base sm:text-lg md:text-xl">
      <CardHeader  className="shrink-0">
        {image.confidence  && (
          <div className="mb-2 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground">Match Confidence</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getTextColor(confidence)}`}>
                {confidence}%
              </span>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getConfidenceColor(confidence)} transition-all duration-500 ease-out rounded-full`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        )}
        <CardTitle>{image.name}</CardTitle>
        <CardDescription className="line-clamp-3 italic">{image.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 overflow-hidden">
        <img loading="lazy" src={image.image_url} alt={image.name} className="w-full h-32 sm:h-40 md:h-48 object-cover" />
        {image.launch_date && new Date(image.launch_date).toLocaleDateString()}
      </CardContent>
      <CardFooter className="flex-col gap-2 shrink-0">
        <Button variant={"outline"} className="w-full">View Full Image</Button>
      </CardFooter>
    </Card>
  )
}


export default SpaceCard