import { Category, ProductListResponse } from '../../domain'
import { ProductApi } from '../../store'

export const productsAPI = ProductApi.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query<
			ProductListResponse,
			{ limit: number; skip: number }
		>({
			query: ({ limit, skip }) => ({
				url: '/products',
				params: { limit, skip }
			}),
			serializeQueryArgs: ({ endpointName }) => endpointName,
			merge: (currentCache, newData) => {
				currentCache.products.push(...newData.products)
				currentCache.skip = newData.skip
				currentCache.total = newData.total
			},
			forceRefetch: ({ currentArg, previousArg }) =>
				currentArg?.skip !== previousArg?.skip
		}),
		searchProducts: builder.query<ProductListResponse, string>({
			query: q => ({ url: '/products/search', params: { q } })
		}),
		getCategories: builder.query<Category[], void>({
			query: () => ({ url: '/products/categories' })
		}),
		getProductsByCategory: builder.query<ProductListResponse, string>({
			query: category => ({ url: `/products/category/${category}` })
		})
	}),
	overrideExisting: false
})

export const {
	useGetProductsQuery,
	useSearchProductsQuery,
	useGetCategoriesQuery,
	useGetProductsByCategoryQuery
} = productsAPI
