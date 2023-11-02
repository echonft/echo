'use client'
import type { Offer } from '@echo/model/types/offer'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { links } from '@echo/ui/constants/links'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer | undefined
  show?: boolean
  onClose?: () => unknown
}

export const NewOfferConfirmedModal: FunctionComponent<Props> = ({ offer, show, onClose }) => {
  const t = useTranslations('offer.new.confirmedModal')

  return (
    <Modal open={Boolean(show)} onClose={onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
        <div className={clsx('flex', 'items-center', 'justify-center')}>
          <ConfirmationIconSvg />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <InternalLink path={isNil(offer) ? '#' : links.profile.offer(offer.id)}>
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
