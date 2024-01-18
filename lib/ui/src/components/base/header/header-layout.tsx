import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HeaderLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <header className={clsx('bg-transparent', 'border-b-2', 'border-solid', 'border-white/[0.08]', 'w-full', 'h-max')}>
      {children}
    </header>
  )
}
