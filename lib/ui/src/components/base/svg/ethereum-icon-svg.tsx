import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import { type FunctionComponent } from 'react'

export const EthereumIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={18} viewBoxHeight={18} {...props}>
      <path
        d="M8.99997 2L4.70081 8.61917L8.99997 10.9776L13.2991 8.61917L8.99997 2ZM8.99997 15L4.70081 9.37587L8.99997 11.75L13.2991 9.37587L8.99997 15Z"
        fill="currentColor"
      />
    </Svg>
  )
}
