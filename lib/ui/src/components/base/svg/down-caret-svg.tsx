import { Svg, SvgProps } from './svg'
import { FunctionComponent } from 'react'

export const DownCaretSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={12} viewBoxHeight={9} {...props}>
      <path
        d="M6 8.19999L0 2.19999L1.4 0.799988L6 5.39999L10.6 0.799988L12 2.19999L6 8.19999Z"
        fill="white"
        fillOpacity="0.5"
      />
    </Svg>
  )
}
