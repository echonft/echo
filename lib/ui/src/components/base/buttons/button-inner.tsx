import { SizeLG, SizeMD, SizeSM, SizeXS } from '../../../types/size'
import { ButtonSize } from './button-size'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface ButtonInnerProps {
  size: ButtonSize
}

export const ButtonInner: FunctionComponent<PropsWithChildren<ButtonInnerProps>> = ({ size, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        size === SizeXS && ['px-6', 'pt-px'],
        size === SizeSM && ['px-11', 'py-1.5'],
        size === SizeMD && ['px-6', 'py-3'],
        size === SizeLG && ['px-11', 'py-3.5']
      )}
    >
      {children}
    </div>
  )
}
