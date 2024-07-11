import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HeaderLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <header
      className={clsx('flex', 'flex-row', 'self-stretch', 'flex-none', 'bg-transparent', 'w-full', 'h-max', 'py-4.5')}
    >
      <PaddedLayout>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-6')}>{children}</div>
      </PaddedLayout>
    </header>
  )
}
