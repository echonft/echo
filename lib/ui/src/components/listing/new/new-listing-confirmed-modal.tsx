'use client'
import { getListingTargetsCollectionSlugs } from '@echo/model/helpers/listing/get-listing-targets-collection-slugs'
import type { Listing } from '@echo/model/types/listing'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { CopyIconSvg } from '@echo/ui/components/base/svg/copy-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { links } from '@echo/ui/constants/links'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, isNil, pipe } from 'ramda'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip } from 'react-tooltip'

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
          <CopyToClipboard
            text={
              isNil(listing)
                ? ''
                : links.collection.listing(
                    pipe<[Listing], string[], string>(getListingTargetsCollectionSlugs, head)(listing),
                    listing.id
                  )
            }
          >
            <button id={'copy-link-btn'} className={clsx('btn-action', 'btn-size-alt', 'group')}>
              <span className={clsx('btn-label-action')}>
                <CopyIconSvg />
              </span>
              <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('copyLinkBtn')}</span>
            </button>
          </CopyToClipboard>
          <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
          </button>
          <Tooltip
            className={clsx('tooltip')}
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
