import { IconSize } from '../../../constants/icon-size'
import { getIconSizeInPx } from '../../../helpers/get-icon-size-in-px'
import { EchoIconSvg } from '../svg/echo-icon-svg'
import { IconContainer } from './icon-container'
import { IconContainerColor } from './icon-container-color'
import { ColorBlack, ColorYellow } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const echoIconColors = [ColorBlack, ColorYellow] as const
export type EchoIconColor = (typeof echoIconColors)[number]

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
