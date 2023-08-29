import { IconSize } from '../../../constants/icon-size'
import { getIconSizeInPx } from '../../../helpers/get-icon-size-in-px'
import { IconContainer } from './icon-container'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface BlurIconProps {
  size: IconSize
}

export const BlurIcon: FunctionComponent<BlurIconProps> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size))
  return (
    <IconContainer size={size}>
      <img
        className={clsx('rounded-lg')}
        src={'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/blur-logo.png?alt=media'}
        width={sizeInPx}
        height={sizeInPx}
        alt={'blur'}
      />
    </IconContainer>
  )
}
