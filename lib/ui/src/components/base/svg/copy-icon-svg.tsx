import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import { type FunctionComponent } from 'react'

export const CopyIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={18} viewBoxHeight={21} {...props}>
      <path
        d="M2.5 20.5C1.95 20.5 1.479 20.304 1.087 19.912C0.695002 19.52 0.499335 19.0493 0.500002 18.5V4.5H2.5V18.5H13.5V20.5H2.5ZM6.5 16.5C5.95 16.5 5.479 16.304 5.087 15.912C4.695 15.52 4.49934 15.0493 4.5 14.5V2.5C4.5 1.95 4.696 1.479 5.088 1.087C5.48 0.695002 5.95067 0.499335 6.5 0.500002H15.5C16.05 0.500002 16.521 0.696002 16.913 1.088C17.305 1.48 17.5007 1.95067 17.5 2.5V14.5C17.5 15.05 17.304 15.521 16.912 15.913C16.52 16.305 16.0493 16.5007 15.5 16.5H6.5Z"
        fill="currentColor"
      />
    </Svg>
  )
}
