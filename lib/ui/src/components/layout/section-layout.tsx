import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const SectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <section className={clsx('w-full', 'relative')}>{children}</section>
}
