import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export interface HeaderLayoutProps {
  absolute?: boolean
}

export const HeaderLayout: FunctionComponent<PropsWithChildren<HeaderLayoutProps>> = ({ absolute, children }) => {
  return (
    <header
      className={clsx(
        'bg-transparent',
        'border-b-2',
        'border-solid',
        'border-white/[0.08]',
        'w-full',
        'h-max',
        absolute && ['absolute', 'inset-x-0', 'top-0']
      )}
    >
      {children}
    </header>
  )
}
