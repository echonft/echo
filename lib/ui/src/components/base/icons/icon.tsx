import { Size } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  size: Size
  className?: string
}

export const Icon: FunctionComponent<PropsWithChildren<Props>> = ({ size, className, children }) => {
  return (
    <div
      className={clsx(
        'rounded-lg',
        '[&>*]:rounded-lg',
        size === Size.SM && ['w-6', 'h-6'],
        size === Size.MD && ['w-8', 'h-8'],
        size === Size.LG && ['w-10', 'h-10'],
        className
      )}
    >
      {children}
    </div>
  )
}
