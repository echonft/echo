import { Nft } from '../../../types/nft'
import { SizeLG } from '../../../types/size'
import { NftThumbnailOffer } from '../../nft/nft-thumbnail-offer'
import { NewOfferAssetsTitle } from '../new/new-offer-assets-title'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsAssetsContainerProps {
  isReceiving: boolean
  assets: Nft[]
}

export const OfferDetailsAssetsContainer: FunctionComponent<OfferDetailsAssetsContainerProps> = ({
  isReceiving,
  assets
}) => {
  const t = useTranslations('offer.misc')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <NewOfferAssetsTitle isReceiving={isReceiving} title={t(isReceiving ? 'assetsInTitle' : 'assetsOutTitle')} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {assets.map((nft) => (
          <NftThumbnailOffer nft={nft} key={nft.id} size={SizeLG} />
        ))}
      </div>
    </div>
  )
}
