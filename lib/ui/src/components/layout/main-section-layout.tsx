import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const MainSectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <main className={clsx('w-full', 'pb-14')}>{children}</main>
}
