import React from 'react'

const Confidence = ({confidence}: {confidence: number}) => {

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
     (
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
      )
  )
}

export default Confidence