import { Nft } from '../../types/nft'
import { User } from '../../types/user'
import { OfferBottomSliderAssetsContainer } from './offer-bottom-slider-assets-container'
import { OfferBottomSliderReceiverContainer } from './offer-bottom-slider-receiver-container'
import { isNilOrEmpty } from '@echo/utils'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  receiver: User
  receiverAssets: Nft[]
  senderAssets?: Nft[]
  onAddMoreSenderAsset?: () => void
  onRemoveSenderAsset?: (nft: Nft) => void
  onAddMoreReceiverAsset?: () => void
  onRemoveReceiverAsset?: (nft: Nft) => void
}

export const OfferBottomSliderInnerContainer: FunctionComponent<Props> = ({
  receiver,
  receiverAssets,
  senderAssets = [],
  onAddMoreSenderAsset,
  onRemoveSenderAsset,
  onAddMoreReceiverAsset,
  onRemoveReceiverAsset
}) => {
  const t = useTranslations('offer.bottomSlider')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('pt-6', 'pb-1')}>
        <OfferBottomSliderReceiverContainer receiver={receiver} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-8')}>
        <OfferBottomSliderAssetsContainer
          isReceiver
          assets={receiverAssets}
          onAddMore={onAddMoreReceiverAsset}
          onRemove={onRemoveReceiverAsset}
        />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      </div>
      <OfferBottomSliderAssetsContainer
        isReceiver={false}
        assets={senderAssets}
        onAddMore={onAddMoreSenderAsset}
        onRemove={onRemoveSenderAsset}
      />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6')}>
        <button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-[9.875rem]', 'py-1.5', '!h-10')}
          disabled={isNilOrEmpty(receiverAssets) || isNilOrEmpty(senderAssets)}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalize')}</span>
        </button>
      </div>
    </div>
  )
}
