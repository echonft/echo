import { ColorBlack, ColorYellow } from '../../../constants/color'
import { getIconSizeInPx } from '../../../helpers/get-icon-size-in-px'
import { EchoIconColor } from '../../../types/echo-icon-color'
import { IconSize } from '../../../types/icon-size'
import { EchoIconSvg } from '../svg/echo-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
