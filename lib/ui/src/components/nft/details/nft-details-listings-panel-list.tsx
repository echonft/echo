import type { Listing } from '@echo/model/types/listing'
import { NftDetailsListingRow } from '@echo/ui/components/nft/details/nft-details-listing-row'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty, map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
}

export const NftDetailsListingsPanelList: FunctionComponent<Props> = ({ listings }) => {
  const t = useTranslations('nft.details.listings')

  if (isEmpty(listings)) {
    return (
      <div className={clsx('flex', 'flex-grow', 'pt-6')}>
        <span className={clsx('prose-header-md-semi', 'text-white/30')}>{t('empty')}</span>
      </div>
    )
  }
  return (
    <div className={clsx('flex', 'flex-col', 'flex-grow', 'gap-2.5', 'self-stretch', 'w-full')}>
      {map(
        ({ id, creator, expiresAt }) => (
          <NftDetailsListingRow key={id} id={id} sender={creator.discord.username} expiresAt={expiresAt} />
        ),
        listings
      )}
    </div>
  )
}
