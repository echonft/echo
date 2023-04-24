import { Svg, SvgProps } from './svg'
import { FunctionComponent } from 'react'

export const CheckmarkIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={14} viewBoxHeight={11} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3536 1.35355C13.5488 1.54882 13.5488 1.8654 13.3536 2.06066L5.35355 10.0607C5.15829 10.2559 4.84171 10.2559 4.64645 10.0607L0.646447 6.06066C0.451184 5.8654 0.451184 5.54881 0.646447 5.35355L1.35355 4.64645C1.54882 4.45118 1.8654 4.45118 2.06066 4.64645L5 7.58579L11.9393 0.646447C12.1346 0.451184 12.4512 0.451184 12.6464 0.646447L13.3536 1.35355Z"
        fill="currentColor"
      />
    </Svg>
  )
}
