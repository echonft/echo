import { Offer } from '../../../types/offer'
import { NftDetailsOfferRow } from './nft-details-offer-row'
import { isNilOrEmpty } from '@echo/utils'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NftDetailsOffersPanelListProps {
  offers?: Offer[]
}

export const NftDetailsOffersPanelList: FunctionComponent<NftDetailsOffersPanelListProps> = ({ offers }) => {
  const t = useTranslations('nft.details.offers')

  if (isNilOrEmpty(offers)) {
    return (
      <div className={clsx('flex', 'flex-grow', 'pt-6')}>
        <span className={clsx('prose-header-md-semi', 'text-white/30')}>{t('empty')}</span>
      </div>
    )
  }
  return (
    <div className={clsx('flex', 'flex-col', 'flex-grow', 'gap-2.5', 'self-stretch', 'w-full')}>
      {offers.map((offer) => (
        <NftDetailsOfferRow
          key={offer.id}
          id={offer.id}
          sender={offer.sender.discordUsername}
          expiresAt={offer.expiresAt.toDate()}
        />
      ))}
    </div>
  )
}
