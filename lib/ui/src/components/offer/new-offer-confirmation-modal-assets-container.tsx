import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
import { NewOfferAssetsSubtitle } from './new-offer-assets-subtitle'
import { NewOfferAssetsTitle } from './new-offer-assets-title'
import { OfferItem } from '@echo/ui-model'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
}

export const NewOfferConfirmationModalAssetsContainer: FunctionComponent<Props> = ({ isReceiver, items = [] }) => {
  const t = useTranslations('offer.new.misc')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <NewOfferAssetsSubtitle subtitle={t(isReceiver ? 'assetsInSubtitle' : 'assetsOutSubtitle')} />
        <NewOfferAssetsTitle isReceiver={isReceiver} title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')} />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {items.map((nft) => (
          <NftThumbnailOffer nft={nft} key={nft.id} />
        ))}
      </div>
    </div>
  )
}
