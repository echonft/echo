import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HeaderLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <header className={clsx('w-full', 'h-max', 'py-4.5')}>
      <PaddedLayout>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-6', 'w-full', 'h-max')}>
          {children}
        </div>
      </PaddedLayout>
    </header>
  )
}
