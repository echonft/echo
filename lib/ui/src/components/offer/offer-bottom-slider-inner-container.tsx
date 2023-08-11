import { SizeLG, SizeMD } from '../../types/size'
import { ButtonColorScheme } from '../base/buttons/button-color-scheme'
import { TextButton } from '../base/buttons/text-button'
import { OfferBottomSliderAssetsContainer } from './offer-bottom-slider-assets-container'
import { OfferBottomSliderCounterpartyContainer } from './offer-bottom-slider-counterparty-container'
import { Nft, User } from '@echo/model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  counterparty: User
  counterpartyAssets: Nft[]
  ownerAssets?: Nft[]
  onAddMoreCounterpartyAsset?: () => void
  onRemoveCounterpartyAsset?: (id: string) => void
  onAddMoreReceiverAsset?: () => void
  onRemoveReceiverAsset?: (id: string) => void
}

export const OfferBottomSliderInnerContainer: FunctionComponent<Props> = ({
  counterparty,
  counterpartyAssets,
  ownerAssets = [],
  onAddMoreCounterpartyAsset,
  onRemoveCounterpartyAsset,
  onAddMoreReceiverAsset,
  onRemoveReceiverAsset
}) => {
  const t = useTranslations('offer.bottomSlider')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <OfferBottomSliderCounterpartyContainer counterparty={counterparty} />
      <OfferBottomSliderAssetsContainer
        counterparty={true}
        assets={counterpartyAssets}
        onAddMore={onAddMoreCounterpartyAsset}
        onRemove={onRemoveCounterpartyAsset}
      />
      <OfferBottomSliderAssetsContainer
        counterparty={false}
        assets={ownerAssets}
        onAddMore={onAddMoreReceiverAsset}
        onRemove={onRemoveReceiverAsset}
      />
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <TextButton label={t('finalize')} fixedWidth={SizeLG} size={SizeMD} colorScheme={ButtonColorScheme.GRADIENT} />
      </div>
    </div>
  )
}
