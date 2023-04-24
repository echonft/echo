import { SvgProps, SvgSizeProps } from '../svg/svg'
import { ButtonSize } from './button-size'
import { cloneElement, ReactElement } from 'react'

export interface TextIconButtonIconContainerProps<T extends SvgProps> {
  size: ButtonSize
  getIconSize: (size: ButtonSize) => SvgSizeProps
  children: ReactElement<T>
}

export const TextIconButtonIconContainer = <T extends SvgProps>({
  size,
  getIconSize,
  children
}: TextIconButtonIconContainerProps<T>) => cloneElement<T>(children, { ...children.props, ...getIconSize(size) })
