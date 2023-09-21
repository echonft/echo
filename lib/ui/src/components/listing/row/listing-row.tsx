import { ListingRowItemsContainer } from '@echo/ui/components/listing/row/listing-row-items-container'
import { ListingRowTargetsContainer } from '@echo/ui/components/listing/row/listing-row-targets-container'
import { StateTextContainer } from '@echo/ui/components/shared/state-text-container'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import type { Listing } from '@echo/ui/types/model/listing'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

dayjs.extend(RelativeTime)

interface Props {
  listing: Listing
}

export const ListingRow: FunctionComponent<Props> = ({ listing }) => {
  const t = useTranslations('listing.details')
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'p-4', 'rounded-2xl', 'bg-white/[0.05]', 'gap-12')}>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'gap-12')}>
        <UserDetailsContainer user={listing.creator} />
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
              'w-[0.125rem]',
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
