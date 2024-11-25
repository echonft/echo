import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const StackPictureLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx('rounded-2xl', 'select-none', 'w-[12.625rem]', 'h-[12.625rem]', 'relative', 'overflow-hidden')}
    >
      {children}
    </div>
  )
}
