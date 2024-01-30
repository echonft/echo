import { Svg, type SvgProps } from '@echo/ui/components/base/svg/svg'
import { type FunctionComponent } from 'react'

export const ExploreIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={13} viewBoxHeight={13} {...props}>
      <g clipPath="url(#explore-icon-rect)">
        <path
          d="M4.88232 8C7.31982 8 8.38232 6.9745 8.38232 4.5C8.38232 6.9745 9.43732 8 11.8823 8C9.43732 8 8.38232 9.055 8.38232 11.5C8.38232 9.055 7.31982 8 4.88232 8ZM1.88232 3.75C3.44932 3.75 4.13232 3.091 4.13232 1.5C4.13232 3.091 4.81082 3.75 6.38232 3.75C4.81082 3.75 4.13232 4.4285 4.13232 6C4.13232 4.4285 3.44932 3.75 1.88232 3.75Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="explore-icon-rect">
          <rect width="12" height="12" fill="currentColor" transform="translate(0.882324 0.5)" />
        </clipPath>
      </defs>
    </Svg>
  )
}
