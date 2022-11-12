import { NftItem } from '@components/nft-item'
import { Erc721 } from '@echo/model/src/erc721'
import clsx from 'clsx'
import { includes } from 'ramda'
import React from 'react'

interface Props {
  nfts: Erc721[]
  selected?: Erc721[]
  onSelect?: (nft: Erc721) => void
}

export const NftList: React.FunctionComponent<Props> = ({ nfts, selected, onSelect }) => {
  return (
    <div className={clsx('grid', 'grid-cols-3', 'gap-2')}>
      {nfts.map((nft) => (
        <NftItem key={nft.key} nft={nft} selected={includes(nft, selected || [])} onSelect={onSelect} />
      ))}
    </div>
  )
}
