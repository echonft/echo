import { CollectionRowLayout } from '@echo/ui/components/collection/row/layout/collection-row-layout'
import { type FunctionComponent } from 'react'

export const CollectionRowSkeleton: FunctionComponent = () => {
  return <CollectionRowLayout loading={true} />
}
