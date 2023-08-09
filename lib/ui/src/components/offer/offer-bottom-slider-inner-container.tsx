import { OfferBottomSliderAssetsContainer } from './offer-bottom-slider-assets-container'
import { OfferBottomSliderCounterpartyContainer } from './offer-bottom-slider-counterparty-container'
import { Nft, User } from '@echo/model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  counterparty: User
  counterpartyAssets: Nft[]
  ownerAssets?: Nft[]
}

export const OfferBottomSliderInnerContainer: FunctionComponent<Props> = ({
  counterparty,
  counterpartyAssets,
  ownerAssets = []
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <OfferBottomSliderCounterpartyContainer counterparty={counterparty} />
      <OfferBottomSliderAssetsContainer counterparty={true} assets={counterpartyAssets} />
      <OfferBottomSliderAssetsContainer counterparty={false} assets={ownerAssets} />
    </div>
  )
}
