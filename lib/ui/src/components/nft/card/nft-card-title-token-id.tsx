import type { Nft } from '@echo/model/types/nft'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftCardTitleTokenId: FunctionComponent<Props> = ({ nft }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.875rem]',
        'font-normal',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white/70',
        'truncate'
      )}
    >
      {getTokenIdString(nft.tokenId, nft.collection.totalSupply)}
    </p>
  )
}
