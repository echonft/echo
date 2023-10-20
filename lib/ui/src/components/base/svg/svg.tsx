import { useSvgSize } from '@echo/ui/hooks/use-svg-size'
import { omit } from 'ramda'
import { type FunctionComponent, type SVGProps } from 'react'

export interface SvgProps extends Omit<SVGProps<SVGElement>, 'width' | 'height'> {
  className?: string
  width?: number
  height?: number
}

interface Props extends SvgProps {
  viewBoxWidth: number
  viewBoxHeight: number
}

export const Svg: FunctionComponent<Props> = ({ children, className, ...props }) => {
  const { viewBox, height, width } = useSvgSize(props)
  // remove viewBoxWidth and viewBoxHeight from props
  const cleanProps = omit(['viewBoxWidth', 'viewBoxHeight', 'ref'], props)
  return (
    <svg
      {...cleanProps}
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
