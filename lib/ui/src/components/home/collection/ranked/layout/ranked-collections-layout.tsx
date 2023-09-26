import { RankedCollectionsHeader } from '@echo/ui/components/home/collection/ranked/ranked-collections-header'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const RankedCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <section className={'w-full'}>
      <RankedCollectionsHeader />
      {children}
    </section>
  )
}
