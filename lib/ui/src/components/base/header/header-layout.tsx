import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HeaderLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <header
      className={clsx(
        'bg-transparent',
        'border-b-2',
        'border-solid',
        'border-white/[0.08]',
        'w-full',
        'h-max',
        'py-4.5'
      )}
    >
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-6')}>{children}</div>
      </PaddedContainer>
    </header>
  )
}
