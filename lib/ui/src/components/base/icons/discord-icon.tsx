import { Icon } from '@echo/ui/components/base/icons/icon'
import { IconColor } from '@echo/ui/components/base/icons/icon-color'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type IconSize } from '@echo/ui/types/icon-size'
import { type FunctionComponent } from 'react'

interface Props {
  size: IconSize
}

export const DiscordIcon: FunctionComponent<Props> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (18.75 / 30))
  const height = Math.floor(getIconSizeInPx(size) * (14.25 / 30))
  return (
    <Icon size={size}>
      <IconColor>
        <DiscordIconSvg width={width} height={height} />
      </IconColor>
    </Icon>
  )
}
