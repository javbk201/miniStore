import { UseRatingStarsResult } from './RatingStars.types'

export const useRatingStars = (rating: number): UseRatingStarsResult => {
	const filledStars = Math.round(rating)
	const stars = Array.from({ length: 5 }, (_, index) => index < filledStars)
	return { stars }
}
