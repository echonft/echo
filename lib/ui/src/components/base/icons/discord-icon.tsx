import { getIconSizeInPx, IconSize } from '../../../constants/icon-size'
import { DiscordIconSvg } from '../svg/discord-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { FunctionComponent } from 'react'

export interface DiscordIconProps {
  size: IconSize
}

export const DiscordIcon: FunctionComponent<DiscordIconProps> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (18.75 / 30))
  const height = Math.floor(getIconSizeInPx(size) * (14.25 / 30))
  return (
    <IconContainer size={size}>
      <IconContainerColor>
        <DiscordIconSvg width={width} height={height} />
      </IconContainerColor>
    </IconContainer>
  )
}
