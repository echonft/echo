import { IconContainer } from '@echo/ui/components/base/icons/icon-container'
import { IconContainerColor } from '@echo/ui/components/base/icons/icon-container-color'
import { ShareIconSvg } from '@echo/ui/components/base/svg/share-icon-svg'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type IconSize } from '@echo/ui/types/icon-size'
import { type FunctionComponent } from 'react'

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
