import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import type { FunctionComponent } from 'react'

export const AddIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={14} viewBoxHeight={14} {...props}>
      <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="currentColor" />
    </Svg>
  )
}
