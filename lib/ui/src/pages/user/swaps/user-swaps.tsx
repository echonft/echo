import type { Swap } from '@echo/model/types/swap'
import { SwapCardsContainer } from '@echo/ui/components/swap/card/layout/swap-cards-container'
import { UserSwapsEmpty } from '@echo/ui/pages/user/swaps/user-swaps-empty'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  swaps: Swap[]
}

export const UserSwaps: FunctionComponent<Props> = ({ username, swaps }) => {
  if (isEmpty(swaps)) {
    return <UserSwapsEmpty username={username} />
  }
  return <SwapCardsContainer swaps={swaps} options={{ asLink: true }} />
}
