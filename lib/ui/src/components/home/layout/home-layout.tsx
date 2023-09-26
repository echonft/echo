import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const HomeLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <PaddedContainer className={clsx('min-h-full', 'pt-20')}>
      <div className={clsx('flex', 'flex-col', 'w-full', 'min-h-full', 'gap-24', 'grow')}>{children}</div>
    </PaddedContainer>
  )
}
