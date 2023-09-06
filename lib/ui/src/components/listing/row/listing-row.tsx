import { StateTextContainer } from '../../shared/state-text-container'
import { UserDetailsContainer } from '../../shared/user-details-container'
import { ListingRowItemsContainer } from './listing-row-items-container'
import { ListingRowTargetsContainer } from './listing-row-targets-container'
import { getListingCreatorWallet, Listing } from '@echo/ui-model'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

dayjs.extend(RelativeTime)

interface Props {
  listing: Listing
}

export const ListingRow: FunctionComponent<Props> = ({ listing }) => {
  const t = useTranslations('listing.details')
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'p-4', 'rounded-2xl', 'bg-white/[0.05]', 'gap-12')}>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'gap-12')}>
        <UserDetailsContainer user={listing.creator} userWalletAddress={getListingCreatorWallet(listing).address} />
        <div className={clsx('mt-4')}>
          <StateTextContainer
            title={listing.expired ? t('expiredAt') : t('expiresAt')}
            subtitle={listing.expired ? listing.expiresAt.fromNow(false) : listing.expiresAt.toNow(true)}
          />
        </div>
      </div>
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <div className={clsx('flex', 'flex-row-reverse', 'grow', 'basis-0')}>
          <ListingRowItemsContainer items={listing.items} />
        </div>
        <div className={clsx('flex', 'self-stretch', 'flex-none', 'py-6')}>
          <span
            className={clsx(
              'mx-10',
              'h-full',
              'w-[2px]',
              'box-border',
              'border-solid',
              'border-x',
              'border-white/[0.08]'
            )}
          />
        </div>
        <div className={clsx('flex', 'grow', 'basis-0')}>
          <ListingRowTargetsContainer targets={listing.targets} />
        </div>
      </div>
    </div>
  )
}
