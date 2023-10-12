'use client'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { CopyIconSvg } from '@echo/ui/components/base/svg/copy-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { links } from '@echo/ui/constants/links'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip } from 'react-tooltip'

interface Props {
  collectionSlug: string
  listingId: string
  show?: boolean
  onClose?: () => unknown
}

export const NewListingConfirmedModal: FunctionComponent<Props> = ({ collectionSlug, listingId, show, onClose }) => {
  const t = useTranslations('listing.new.confirmedModal')

  return (
    <Modal open={Boolean(show)} onClose={onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
        <div className={clsx('flex', 'items-center', 'justify-center')}>
          <ConfirmationIconSvg />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <CopyToClipboard text={links.collection.listing(collectionSlug, listingId)} onCopy={onClose}>
            <button id={'copy-link-btn'} className={clsx('btn-action', 'group', 'w-40', 'py-1.5', 'h-10', 'gap-2.5')}>
              <span className={clsx('text-purple-900', 'group-hover:text-white')}>
                <CopyIconSvg />
              </span>
              <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('copyLinkBtn')}</span>
            </button>
          </CopyToClipboard>
          <button className={clsx('btn-gradient', 'btn-size-alt', 'group', 'outline-none')} onClick={onClose}>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
          </button>
          <Tooltip
            anchorSelect={'#copy-link-btn'}
            content={t('linkCopied')}
            delayHide={2000}
            openOnClick={true}
            noArrow={true}
          />
        </div>
      </div>
    </Modal>
  )
}
