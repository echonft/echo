import { getIconSizeInPx } from '../../../helpers/get-icon-size-in-px'
import { IconSize } from '../../../types/icon-size'
import { TwitterIconSvg } from '../svg/twitter-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { FunctionComponent } from 'react'

interface Props {
  size: IconSize
}

export const TwitterIcon: FunctionComponent<Props> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (21 / 30))
  const height = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <IconContainerColor>
        <TwitterIconSvg width={width} height={height} />
      </IconContainerColor>
    </IconContainer>
  )
}
