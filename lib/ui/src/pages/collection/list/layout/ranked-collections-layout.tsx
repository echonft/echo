import { RankedCollectionsHeader } from '@echo/ui/pages/collection/list/ranked-collections-header'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const RankedCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <RankedCollectionsHeader />
      {children}
    </div>
  )
}
