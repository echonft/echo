import { CollectionListLayout } from '@echo/ui/components/collection/row/layout/collection-list-layout'
import { CollectionRowSkeleton } from '@echo/ui/components/collection/row/skeleton/collection-row-skeleton'
import { map, pipe, range } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  count?: number
}
export const CollectionListSkeleton: FunctionComponent<Props> = ({ count = 5 }) => {
  return (
    <CollectionListLayout>
      {pipe(
        range,
        map((index) => <CollectionRowSkeleton key={index} />)
      )(0, count)}
    </CollectionListLayout>
  )
}
