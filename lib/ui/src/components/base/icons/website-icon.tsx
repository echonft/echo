import { WebsiteIconSvg } from '../svg/website-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { getIconSizeInPx, IconSize } from './icon-size'
import { FunctionComponent } from 'react'

export interface WebsiteIconProps {
  size: IconSize
}

export const WebsiteIcon: FunctionComponent<WebsiteIconProps> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <IconContainerColor>
        <WebsiteIconSvg width={sizeInPx} height={sizeInPx} />
      </IconContainerColor>
    </IconContainer>
  )
}
