import { FlagIconSvg } from '../svg/flag-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { getIconSizeInPx, IconSize } from './icon-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface RedFlagIconProps {
  size: IconSize
}

export const RedFlagIcon: FunctionComponent<RedFlagIconProps> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (13 / 24))
  const height = Math.floor(getIconSizeInPx(size) * (14 / 24))
  return (
    <IconContainer size={size}>
      <IconContainerColor>
        <div className={clsx('text-red-500')}>
          <FlagIconSvg width={width} height={height} />
        </div>
      </IconContainerColor>
    </IconContainer>
  )
}
