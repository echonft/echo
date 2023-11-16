import type { Nft } from '@echo/model/types/nft'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnailTitleTokenId: FunctionComponent<Props> = ({ nft }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.75rem]',
        'font-medium',
        'leading-[0.8125rem]',
        'tracking-[0.015rem]',
        'text-white/70',
        'truncate'
      )}
    >
      {getTokenIdString(nft.tokenId, nft.collection.totalSupply)}
    </p>
  )
}
