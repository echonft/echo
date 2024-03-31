import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import { type FunctionComponent } from 'react'

export const LogoutIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={24} viewBoxHeight={24} {...props}>
      <path
        d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
        fill="currentColor"
      />
    </Svg>
  )
}
