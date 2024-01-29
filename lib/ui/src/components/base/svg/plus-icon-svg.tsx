import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import type { FunctionComponent } from 'react'

export const PlusIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={24} viewBoxHeight={24} {...props}>
      <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="currentColor" />
    </Svg>
  )
}
