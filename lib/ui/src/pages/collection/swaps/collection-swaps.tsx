import type { Swap } from '@echo/model/types/swap'
import { SwapCardsContainer } from '@echo/ui/components/swap/card/layout/swap-cards-container'
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
  return <SwapCardsContainer swaps={swaps} options={{ asLink: true }} />
}
