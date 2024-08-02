import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import { type FunctionComponent } from 'react'

export const ExternalLinkIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={25} viewBoxHeight={25} {...props}>
      <path
        d="M9.625 1H3.875C3.1125 1 2.38123 1.3029 1.84207 1.84207C1.3029 2.38123 1 3.1125 1 3.875V21.125C1 21.8875 1.3029 22.6188 1.84207 23.1579C2.38123 23.6971 3.1125 24 3.875 24H21.125C21.8875 24 22.6188 23.6971 23.1579 23.1579C23.6971 22.6188 24 21.8875 24 21.125V15.375M12.5 12.5L24 1M24 1V8.1875M24 1H16.8125"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
