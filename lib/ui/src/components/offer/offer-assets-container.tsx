import { Nft } from '../../types/nft'
import { SizeLG } from '../../types/size'
import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferAssetsContainerProps {
  items: Nft[]
  discordUsername?: string
}

export const OfferAssetsContainer: FunctionComponent<OfferAssetsContainerProps> = ({ items, discordUsername }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4')}>
      {items.map((nft) => (
        <NftThumbnailOffer nft={nft} key={nft.id} size={SizeLG} discordUsername={discordUsername} />
      ))}
    </div>
  )
}
