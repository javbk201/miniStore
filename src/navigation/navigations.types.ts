import { Product } from '../domain'

export interface RootTabParamList {
	Productos: undefined
	Detalles: { product: Product } | undefined
	Favoritos: undefined
}
