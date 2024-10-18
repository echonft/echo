import { Icon } from '@echo/ui/components/base/icons/icon'
import { IconColor } from '@echo/ui/components/base/icons/icon-color'
import { TwitterIconSvg } from '@echo/ui/components/base/svg/twitter-icon-svg'
import { Size } from '@echo/ui/constants/size'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type FunctionComponent } from 'react'

interface Props {
  size: Size
}

export const TwitterIcon: FunctionComponent<Props> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (21 / 30))
  const height = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <Icon size={size}>
      <IconColor>
        <TwitterIconSvg width={width} height={height} />
      </IconColor>
    </Icon>
  )
}
