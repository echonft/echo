import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CardPictureLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('rounded-2xl', 'select-none', 'w-[12.5rem]', 'h-[12.5rem]', 'relative', 'overflow-hidden')}>
      {children}
    </div>
  )
}
