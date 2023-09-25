import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  title: string
}

export const HomeSectionLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <section className={'w-full'}>
      <div className={clsx('flex', 'flex-col', 'gap-8', 'w-full', 'h-max')}>
        <h2 className={clsx('prose-header-md-semi', 'text-white')}>{title}</h2>
        {children}
      </div>
    </section>
  )
}
