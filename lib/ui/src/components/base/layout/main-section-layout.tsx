import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const MainSectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <main className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'min-h-full', 'w-full', 'pb-14')}>
      {children}
    </main>
  )
}
