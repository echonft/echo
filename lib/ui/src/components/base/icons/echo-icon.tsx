import { IconContainer } from '@echo/ui/components/base/icons/icon-container'
import { IconContainerColor } from '@echo/ui/components/base/icons/icon-container-color'
import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { ColorBlack, ColorYellow } from '@echo/ui/constants/color'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type EchoIconColor } from '@echo/ui/types/echo-icon-color'
import { type IconSize } from '@echo/ui/types/icon-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  color: EchoIconColor
  size: IconSize
}
export const EchoIcon: FunctionComponent<Props> = ({ color, size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (13 / 24))
  return (
    <IconContainer size={size}>
      <IconContainerColor
        className={clsx(
          color === ColorBlack && ['text-dark-900', 'bg-yellow-500'],
          color === ColorYellow && 'text-yellow-700'
        )}
      >
        <EchoIconSvg width={sizeInPx} height={sizeInPx} />
      </IconContainerColor>
    </IconContainer>
  )
}
