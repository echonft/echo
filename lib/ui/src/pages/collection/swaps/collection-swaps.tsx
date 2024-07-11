import type { Swap } from '@echo/model/types/swap'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import { CollectionSwapsEmpty } from '@echo/ui/pages/collection/swaps/collection-swaps-empty'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  swaps: Swap[]
}

export const CollectionSwaps: FunctionComponent<Props> = ({ swaps }) => {
  if (isEmpty(swaps)) {
    return <CollectionSwapsEmpty />
  }
  return <SwapCards swaps={swaps} options={{ asLink: true }} />
}
