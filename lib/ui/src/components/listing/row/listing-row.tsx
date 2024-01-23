import { LISTING_STATE_EXPIRED } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import { StateTextContainer } from '@echo/ui/components/base/state-text-container'
import { ListingRowItemsContainer } from '@echo/ui/components/listing/row/listing-row-items-container'
import { ListingRowTargetsContainer } from '@echo/ui/components/listing/row/listing-row-targets-container'
import { ListingOfferUserDetails } from '@echo/ui/components/user/listing-offer/listing-offer-user-details'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  listing: Listing
}

export const ListingRow: FunctionComponent<Props> = ({ listing }) => {
  const t = useTranslations('listing.details')
  const expired = listing.state === LISTING_STATE_EXPIRED
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'p-4', 'rounded-2xl', 'bg-white/[0.05]', 'gap-12')}>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'gap-12')}>
        <ListingOfferUserDetails user={listing.creator} />
        <div className={clsx('mt-4')}>
          <StateTextContainer
            title={expired ? t('expiredAt') : t('expiresAt')}
            subtitle={
              expired ? dayjs.unix(listing.expiresAt).fromNow(false) : dayjs.unix(listing.expiresAt).toNow(true)
            }
          />
        </div>
      </div>
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <ListingRowItemsContainer items={listing.items} />
        <div className={clsx('flex', 'self-stretch', 'flex-none', 'py-6')}>
          <span
            className={clsx(
              'mx-10',
              'h-full',
              'w-[0.125rem]',
              'box-border',
              'border-solid',
              'border-x',
              'border-white/[0.08]'
            )}
          />
        </div>
        <ListingRowTargetsContainer targets={listing.targets} />
      </div>
    </div>
  )
}
