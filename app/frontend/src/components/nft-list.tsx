import { NftItem } from '@components/nft-item'
import { Nft } from '@echo/model'
import { clsx } from 'clsx'
import { includes } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  selected?: Nft[]
  onSelect?: (nft: Nft) => void
}

export const NftList: FunctionComponent<Props> = ({ nfts, selected, onSelect }) => {
  return (
    <div className={clsx('grid', 'grid-cols-3', 'gap-2')}>
      {nfts.map((nft) => (
        <NftItem key={nft.key} nft={nft} selected={selected && includes(nft, selected)} onSelect={onSelect} />
      ))}
    </div>
  )
}
