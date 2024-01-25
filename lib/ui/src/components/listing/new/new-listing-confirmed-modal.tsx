'use client'
import type { Listing } from '@echo/model/types/listing'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing | undefined
  open: boolean
  onClose?: () => unknown
}

export const NewListingConfirmedModal: FunctionComponent<Props> = ({ listing, open, onClose }) => {
  const t = useTranslations('listing.new.confirmedModal')

  return (
    <Modal open={open} onClose={onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
        <div className={clsx('flex', 'items-center', 'justify-center')}>
          <ConfirmationIconSvg />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          {/*FIXME Should link to listing details, but the view doesn't exist yet. See DEV-201 */}
          <InternalLink path={isNil(listing) ? '#' : '#'}>
            <button className={clsx('btn-action', 'btn-size-alt', 'group')}>
              <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('viewBtn')}</span>
            </button>
          </InternalLink>
          <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}
