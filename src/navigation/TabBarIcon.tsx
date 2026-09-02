import React from 'react'
import { Icon } from '@ui-kitten/components'
import { TabBarIconProps } from './TabBarNavigator.types'
import { TAB_ICON_NAMES } from './TabBarNavigator.constants'

export const TabBarIcon = ({
	routeName,
	focused,
	color,
	size
}: TabBarIconProps): React.JSX.Element => {
	const icons = TAB_ICON_NAMES[routeName]
	return (
		<Icon
			name={focused ? icons.filled : icons.outline}
			fill={color}
			style={{ width: size, height: size }}
		/>
	)
}
