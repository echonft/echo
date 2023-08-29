import { getIconSizeInPx, IconSize } from '../../../constants/icon-size'
import { OpenSeaIconSvg } from '../svg/open-sea-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { FunctionComponent } from 'react'

export interface OpenSeaIconProps {
  size: IconSize
}

export const OpenSeaIcon: FunctionComponent<OpenSeaIconProps> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <IconContainerColor>
        <OpenSeaIconSvg width={sizeInPx} height={sizeInPx} />
      </IconContainerColor>
    </IconContainer>
  )
}
