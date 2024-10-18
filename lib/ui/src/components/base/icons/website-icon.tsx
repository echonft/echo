import { Icon } from '@echo/ui/components/base/icons/icon'
import { IconColor } from '@echo/ui/components/base/icons/icon-color'
import { WebsiteIconSvg } from '@echo/ui/components/base/svg/website-icon-svg'
import { Size } from '@echo/ui/constants/size'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type FunctionComponent } from 'react'

interface Props {
  size: Size
}

export const WebsiteIcon: FunctionComponent<Props> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <Icon size={size}>
      <IconColor>
        <WebsiteIconSvg width={sizeInPx} height={sizeInPx} />
      </IconColor>
    </Icon>
  )
}
