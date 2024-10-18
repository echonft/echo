import { Icon } from '@echo/ui/components/base/icons/icon'
import { IconColor } from '@echo/ui/components/base/icons/icon-color'
import { OpenSeaIconSvg } from '@echo/ui/components/base/svg/open-sea-icon-svg'
import { Size } from '@echo/ui/constants/size'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type FunctionComponent } from 'react'

interface Props {
  size: Size
}

export const OpenSeaIcon: FunctionComponent<Props> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <Icon size={size}>
      <IconColor>
        <OpenSeaIconSvg width={sizeInPx} height={sizeInPx} />
      </IconColor>
    </Icon>
  )
}
