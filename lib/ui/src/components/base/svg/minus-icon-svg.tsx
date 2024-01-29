import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import type { FunctionComponent } from 'react'

export const MinusIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={24} viewBoxHeight={24} {...props}>
      <path d="M19 12.998H13H11H5V10.998H11H13H19V12.998Z" fill="currentColor" />
    </Svg>
  )
}
