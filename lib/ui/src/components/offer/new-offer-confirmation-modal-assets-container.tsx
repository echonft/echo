import { Nft } from '../../types/nft'
import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
import { NewOfferAssetsSubtitle } from './new-offer-assets-subtitle'
import { NewOfferAssetsTitle } from './new-offer-assets-title'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  assets: Nft[]
}

export const NewOfferConfirmationModalAssetsContainer: FunctionComponent<Props> = ({ isReceiver, assets = [] }) => {
  const t = useTranslations('offer.new.misc')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <NewOfferAssetsSubtitle subtitle={t(isReceiver ? 'assetsInSubtitle' : 'assetsOutSubtitle')} />
        <NewOfferAssetsTitle isReceiver={isReceiver} title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')} />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {assets.map((nft) => (
          <NftThumbnailOffer nft={nft} key={nft.id} />
        ))}
      </div>
    </div>
  )
}
