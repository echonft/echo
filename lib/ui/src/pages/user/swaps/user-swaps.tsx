import type { Swap } from '@echo/model/types/swap'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
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
  return <SwapCards swaps={swaps} options={{ asLink: true }} />
}
