import { Svg, SvgProps } from './svg'
import { FunctionComponent } from 'react'

export const XIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={12} viewBoxHeight={12} {...props}>
      <path
        d="M1.35355 11.3536C1.54882 11.5488 1.8654 11.5488 2.06066 11.3536L6 7.41421L9.93934 11.3536C10.1346 11.5488 10.4512 11.5488 10.6464 11.3536L11.3536 10.6464C11.5488 10.4512 11.5488 10.1346 11.3536 9.93934L7.41421 6L11.3536 2.06066C11.5488 1.8654 11.5488 1.54882 11.3536 1.35355L10.6464 0.646447C10.4512 0.451184 10.1346 0.451184 9.93934 0.646447L6 4.58579L2.06066 0.646447C1.8654 0.451184 1.54882 0.451184 1.35356 0.646447L0.646449 1.35355C0.451187 1.54882 0.451187 1.8654 0.646449 2.06066L4.58579 6L0.646447 9.93934C0.451184 10.1346 0.451185 10.4512 0.646447 10.6464L1.35355 11.3536Z"
        fill="currentColor"
      />
    </Svg>
  )
}
