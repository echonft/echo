import { ShareIconSvg } from '../svg/share-icon-svg'
import { IconContainer } from './icon-container'
import { getIconSizeInPx, IconSize } from './icon-size'
import { FunctionComponent } from 'react'

export interface ShareIconProps {
  size: IconSize
}

export const ShareIcon: FunctionComponent<ShareIconProps> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (13.5 / 30))
  const height = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <ShareIconSvg width={width} height={height} />
    </IconContainer>
  )
}
