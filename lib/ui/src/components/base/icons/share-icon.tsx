import { getIconSizeInPx } from '../../../helpers/get-icon-size-in-px'
import { IconSize } from '../../../types/icon-size'
import { ShareIconSvg } from '../svg/share-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { FunctionComponent } from 'react'

interface Props {
  size: IconSize
}

export const ShareIcon: FunctionComponent<Props> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (13.5 / 30))
  const height = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <IconContainerColor>
        <ShareIconSvg width={width} height={height} />
      </IconContainerColor>
    </IconContainer>
  )
}
