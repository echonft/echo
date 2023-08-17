import { Nft } from '../../types/nft'
import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
import { NewOfferAddMoreButton } from './new-offer-add-more-button'
import { NewOfferAssetsTitle } from './new-offer-assets-title'
import { NewOfferEmptyAssets } from './new-offer-empty-assets'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  assets: Nft[]
  onAddMore?: () => void
  onRemove?: (nft: Nft) => void
}

export const NewOfferBottomSliderAssetsContainer: FunctionComponent<Props> = ({
  isReceiver,
  assets = [],
  onAddMore,
  onRemove
}) => {
  const t = useTranslations('offer.new.misc')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <NewOfferAssetsTitle isReceiver={isReceiver} title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {isEmpty(assets) ? (
          <NewOfferEmptyAssets onAddMore={onAddMore} />
        ) : (
          <>
            {assets.map((nft) => (
              <NftThumbnailOffer nft={nft} key={nft.id} onRemove={onRemove} />
            ))}
            <NewOfferAddMoreButton onClick={onAddMore} />)
          </>
        )}
      </div>
    </div>
  )
}
