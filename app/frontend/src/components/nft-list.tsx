import { Nft } from '@echo/model'
import { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  selected?: Nft[]
  onSelect?: (nft: Nft) => void
}

export const NftList: FunctionComponent<Props> = () => {
  // return (
  //   <div className={clsx('grid', 'grid-cols-3', 'gap-2')}>
  //     {nfts.map((nft) => (
  //       <NftItem key={nft.key} nft={nft} selected={selected && includes(nft, selected)} onSelect={onSelect} />
  //     ))}
  //   </div>
  // )
  return null
}
