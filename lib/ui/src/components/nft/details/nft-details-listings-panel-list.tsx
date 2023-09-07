import { NftDetailsListingRow } from './nft-details-listing-row'
import { Listing } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty, map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  listings: Array<Listing>
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
          <NftDetailsListingRow key={id} id={id} sender={creator.discordUsername} expiresAt={expiresAt} />
        ),
        listings
      )}
    </div>
  )
}
