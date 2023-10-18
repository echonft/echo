import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import { DirectionLeft, DirectionUp } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const swapIconDirections = [DirectionUp, DirectionLeft] as const
export type SwapIconDirection = (typeof swapIconDirections)[number]

interface Props extends SvgProps {
  direction: SwapIconDirection
}

export const SwapIconSvg: FunctionComponent<Props> = ({ direction, ...rest }) => (
  <Svg viewBoxWidth={64} viewBoxHeight={45} className={clsx(direction === DirectionUp ? 'rotate-90' : '')} {...rest}>
    <path
      d="M60 26.3089C60.868 26.3081 61.7127 26.581 62.4064 27.0865C63.1 27.5921 63.6049 28.3026 63.8446 29.1108C64.0843 29.9189 64.0459 30.7807 63.735 31.5658C63.4242 32.3509 62.858 33.0166 62.1219 33.4622L51.3806 43.867C51.0093 44.2264 50.5686 44.5114 50.0836 44.7058C49.5987 44.9002 49.0789 45.0002 48.554 45C48.0292 44.9998 47.5095 44.8995 47.0246 44.7048C46.5398 44.51 46.0993 44.2247 45.7283 43.8651C45.3573 43.5054 45.063 43.0785 44.8623 42.6087C44.6616 42.1389 44.5584 41.6355 44.5586 41.127C44.5588 40.6186 44.6624 40.1152 44.8634 39.6455C45.0644 39.1759 45.359 38.7492 45.7303 38.3898L50.2098 34.0544L20.04 34.0544C18.9802 34.0544 17.9638 33.6466 17.2144 32.9207C16.465 32.1948 16.044 31.2102 16.044 30.1836C16.044 29.157 16.465 28.1724 17.2144 27.4465C17.9638 26.7206 18.9802 26.3128 20.04 26.3128L60 26.3089ZM4.00002 18.6911C3.13199 18.6919 2.28728 18.419 1.59363 17.9135C0.899982 17.4079 0.395122 16.6974 0.155402 15.8893C-0.0843131 15.0811 -0.0458609 14.2193 0.264957 13.4342C0.575775 12.6491 1.14205 11.9834 1.87814 11.5378L12.6194 1.133C13.3692 0.407189 14.386 -0.000364887 15.446 -1.88014e-06C16.506 0.000361127 17.5225 0.408612 18.2717 1.13494C19.021 1.86126 19.4418 2.84617 19.4414 3.87298C19.441 4.8998 19.0196 5.88442 18.2697 6.61023L13.7902 10.9456L43.96 10.9456C45.0198 10.9456 46.0362 11.3534 46.7856 12.0793C47.535 12.8052 47.956 13.7898 47.956 14.8164C47.956 15.843 47.535 16.8276 46.7856 17.5535C46.0362 18.2794 45.0198 18.6872 43.96 18.6872L4.00002 18.6911Z"
      fill="#EFF427"
    />
  </Svg>
)
