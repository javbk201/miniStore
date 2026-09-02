import { ParamListBase } from '@react-navigation/routers'
import { RootTabParamList } from './navigations.types'

export type TabBarParamList = RootTabParamList & ParamListBase

export interface TabIconNames {
	filled: string
	outline: string
}

export interface TabBarIconProps {
	routeName: keyof RootTabParamList
	focused: boolean
	color: string
	size: number
}
