import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <section className={clsx('w-full', 'relative')}>{children}</section>
}
