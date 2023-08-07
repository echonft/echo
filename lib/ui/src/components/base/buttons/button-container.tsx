import { SizeFull, SizeLG, SizeMD, SizeSM, SizeXS } from '../../../types/size'
import { ButtonSize } from './button-size'
import { ButtonWidth } from './button-width'
import { clsx } from 'clsx'
import { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

export interface ButtonContainerProps {
  size: ButtonSize
  disabled?: boolean
  fixedWidth?: ButtonWidth
  onClick?: MouseEventHandler
}

export const ButtonContainer: FunctionComponent<PropsWithChildren<ButtonContainerProps>> = ({
  size,
  disabled,
  fixedWidth,
  onClick,
  children
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'group',
        'h-max',
        size === SizeXS && ['rounded-lg', '[&>div]:rounded-lg'],
        size === SizeSM && ['rounded-lg', '[&>div]:rounded-lg'],
        size === SizeMD && ['rounded-md', '[&>div]:rounded-md'],
        size === SizeLG && ['rounded-lg', '[&>div]:rounded-lg'],
        fixedWidth === SizeMD && 'w-16',
        fixedWidth === SizeLG && 'w-36',
        fixedWidth === SizeFull && 'w-full'
      )}
    >
      {children}
    </button>
  )
}
