import { SizeLG, SizeMD, SizeSM, SizeXS } from '../../../types/size'
import { ButtonSize } from './button-size'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface ButtonLabelProps {
  size: ButtonSize
}

export const ButtonLabel: FunctionComponent<PropsWithChildren<ButtonLabelProps>> = ({ size, children }) => {
  return (
    <span
      className={clsx(
        'truncate',
        size === SizeXS && ['prose-label-md'],
        size === SizeSM && ['prose-label-sm-semi'],
        size === SizeMD && ['prose-label-lg'],
        size === SizeLG && ['prose-label-lg-semi']
      )}
    >
      {children}
    </span>
  )
}
