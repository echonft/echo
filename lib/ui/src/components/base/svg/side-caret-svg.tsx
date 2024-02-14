import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import { DIRECTION_LEFT } from '@echo/ui/constants/direction'
import { classes } from '@echo/ui/helpers/classes'
import type { Direction } from '@echo/ui/types/direction'
import { type FunctionComponent } from 'react'

interface Props extends SvgProps {
  direction: Direction
}

export const SideCaretSvg: FunctionComponent<Props> = ({ direction, ...rest }) => (
  <Svg
    viewBoxWidth={9}
    viewBoxHeight={14}
    className={classes(direction === DIRECTION_LEFT ? 'rotate-180' : '')}
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.35363 13.3536C2.15837 13.5488 1.84178 13.5488 1.64652 13.3536L0.939415 12.6464C0.744153 12.4512 0.744153 12.1346 0.939416 11.9393L5.87876 7L0.939416 2.06066C0.744153 1.8654 0.744153 1.54882 0.939416 1.35355L1.64652 0.646447C1.84178 0.451185 2.15837 0.451185 2.35363 0.646447L8.35363 6.64645C8.54889 6.84171 8.54889 7.15829 8.35363 7.35355L2.35363 13.3536Z"
      fill="currentColor"
    />
  </Svg>
)
