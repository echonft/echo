import { IconSize } from '../../../constants/icon-size'
import { getIconSizeInPx } from '../../../helpers/get-icon-size-in-px'
import { WebsiteIconSvg } from '../svg/website-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { FunctionComponent } from 'react'

interface Props {
  size: IconSize
}

export const WebsiteIcon: FunctionComponent<Props> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <IconContainerColor>
        <WebsiteIconSvg width={sizeInPx} height={sizeInPx} />
      </IconContainerColor>
    </IconContainer>
  )
}
