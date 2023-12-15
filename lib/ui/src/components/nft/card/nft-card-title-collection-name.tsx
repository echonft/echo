import type { Nft } from '@echo/model/types/nft'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftCardTitleCollectionName: FunctionComponent<Props> = ({ nft }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.875rem]',
        'font-medium',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white',
        'truncate'
      )}
    >
      {nft.collection.name}
    </p>
  )
}
