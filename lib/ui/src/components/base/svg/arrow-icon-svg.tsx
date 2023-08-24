import { Svg, SvgProps } from './svg'
import { DirectionLeft, DirectionRight } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const arrowIconDirections = [DirectionRight, DirectionLeft] as const
export type ArrowIconDirection = (typeof arrowIconDirections)[number]

export interface ArrowIconSvgProps extends SvgProps {
  direction: ArrowIconDirection
}

export const ArrowIconSvg: FunctionComponent<ArrowIconSvgProps> = ({ direction, ...rest }) => {
  return (
    <Svg
      viewBoxHeight={14}
      viewBoxWidth={9}
      className={clsx(direction === DirectionLeft ? 'rotate-90' : '-rotate-90')}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.06066 13.3536C1.8654 13.5488 1.54882 13.5488 1.35355 13.3536L0.646447 12.6464C0.451184 12.4512 0.451185 12.1346 0.646447 11.9393L5.58579 7L0.646447 2.06066C0.451185 1.8654 0.451185 1.54882 0.646447 1.35355L1.35355 0.646447C1.54882 0.451185 1.8654 0.451185 2.06066 0.646447L8.06066 6.64645C8.25592 6.84171 8.25592 7.15829 8.06066 7.35355L2.06066 13.3536Z"
        fill="currentColor"
      />
    </Svg>
  )
}
