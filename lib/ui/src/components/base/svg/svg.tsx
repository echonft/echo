import { useSvgSize } from '@echo/ui/hooks/use-svg-size'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import { omit } from 'ramda'
import { type FunctionComponent, type SVGProps } from 'react'

export interface SvgProps extends Omit<SVGProps<SVGElement>, 'width' | 'height' | 'viewBox'>, WithClassNameProps {
  width?: number
  height?: number
}

interface Props extends SvgProps {
  viewBoxWidth: number
  viewBoxHeight: number
}

export const Svg: FunctionComponent<Props> = ({ children, className, ...props }) => {
  const { viewBox, height, width } = useSvgSize(props)
  return (
    <svg
      {...omit(['viewBoxWidth', 'viewBoxHeight', 'ref'], props)}
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('select-none', className)}
    >
      {children}
    </svg>
  )
}
