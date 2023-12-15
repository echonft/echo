import type { Nft } from '@echo/model/types/nft'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnailTitleCollectionName: FunctionComponent<Props> = ({ nft }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.75rem]',
        'font-medium',
        'leading-[0.8125rem]',
        'tracking-[0.015rem]',
        'text-white',
        'truncate'
      )}
    >
      {nft.collection.name}
    </p>
  )
}
