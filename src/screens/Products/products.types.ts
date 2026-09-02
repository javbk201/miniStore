import { Product } from '../../domain'

export interface ProductHook {
	products: Product[] | undefined
	isloading: boolean
}
