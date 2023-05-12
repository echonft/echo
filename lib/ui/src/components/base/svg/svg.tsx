import { useSvgSize } from '../../../hooks/use-svg-size'
import { FunctionComponent, SVGProps } from 'react'

export interface SvgSizeProps {
  width?: number
  height?: number
}
export interface SvgProps extends Omit<SVGProps<SVGElement>, 'width' | 'height'>, SvgSizeProps {
  className?: string
}

interface Props extends SvgProps {
  viewBoxWidth: number
  viewBoxHeight: number
}

export const Svg: FunctionComponent<Props> = ({ children, className, ...props }) => {
  const { viewBox, height, width } = useSvgSize(props)
  return (
    <svg
      {...props}
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {children}
    </svg>
  )
}
