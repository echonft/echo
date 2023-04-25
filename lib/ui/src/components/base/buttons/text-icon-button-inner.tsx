import { SizeLG, SizeMD, SizeSM, SizeXS } from '../../../types/size'
import { ButtonSize } from './button-size'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface TextIconButtonInnerProps {
  size: ButtonSize
}

export const TextIconButtonInner: FunctionComponent<PropsWithChildren<TextIconButtonInnerProps>> = ({
  size,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'items-center',
        size === SizeXS && 'gap-2',
        size === SizeSM && 'gap-2',
        size === SizeMD && 'gap-2.5',
        size === SizeLG && 'gap-3'
      )}
    >
      {children}
    </div>
  )
}
