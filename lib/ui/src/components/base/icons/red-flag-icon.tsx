import { IconSize } from '../../../constants/icon-size'
import { getIconSizeInPx } from '../../../helpers/get-icon-size-in-px'
import { FlagIconSvg } from '../svg/flag-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  size: IconSize
}

export const RedFlagIcon: FunctionComponent<Props> = ({ size }) => {
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
