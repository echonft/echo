import { IconContainer } from '@echo/ui/components/base/icons/icon-container'
import { IconContainerColor } from '@echo/ui/components/base/icons/icon-container-color'
import { FlagIconSvg } from '@echo/ui/components/base/svg/flag-icon-svg'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type IconSize } from '@echo/ui/types/icon-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

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
