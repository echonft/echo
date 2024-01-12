import { CollectionSwapsSkeleton } from '@echo/ui/components/collection/swap/skeleton/collection-swaps-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const CollectionSwapsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <CollectionSwapsSkeleton />
}

export default CollectionSwapsLoading
