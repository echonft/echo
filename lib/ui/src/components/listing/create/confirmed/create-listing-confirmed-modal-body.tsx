'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { Listing } from '@echo/model/types/listing'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing | undefined
  onClose?: EmptyFunction
}

export const CreateListingConfirmedModalBody: FunctionComponent<Props> = ({ listing, onClose }) => {
  const t = useTranslations('listing.new.confirmedModal')

  if (isNil(listing)) {
    return null
  }
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <ConfirmationIconSvg />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <InternalLink path={linkProvider.listing.details.getUrl({ listingId: listing.id })}>
          <button className={clsx('btn-action', 'btn-size-alt', 'group')}>
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('viewBtn')}</span>
          </button>
        </InternalLink>
        <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
        </button>
      </div>
    </div>
  )
}
