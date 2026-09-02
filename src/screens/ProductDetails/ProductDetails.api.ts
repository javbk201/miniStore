import { Product } from '../../domain'
import { ProductApi } from '../../store'

export const productDetailApi = ProductApi.injectEndpoints({
	endpoints: builder => ({
		getProductById: builder.query<Product, number>({
			query: id => ({ url: `/products/${id}` })
		})
	}),
	overrideExisting: false
})

export const { useGetProductByIdQuery } = productDetailApi
