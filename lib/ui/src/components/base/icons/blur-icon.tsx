import { IconContainer } from '@echo/ui/components/base/icons/icon-container'
import { Img } from '@echo/ui/components/base/img'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type IconSize } from '@echo/ui/types/icon-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  size: IconSize
}

export const BlurIcon: FunctionComponent<Props> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size))
  return (
    <IconContainer size={size}>
      <Img
        className={clsx('rounded-lg')}
        src={'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/blur-logo.png?alt=media'}
        width={sizeInPx}
        height={sizeInPx}
        alt={'blur'}
      />
    </IconContainer>
  )
}
