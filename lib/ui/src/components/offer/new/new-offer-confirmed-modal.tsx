'use client'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalTitle } from '@echo/ui/components/layout/modal/modal-title'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  show?: boolean
  onClose?: () => unknown
}

export const NewOfferConfirmedModal: FunctionComponent<Props> = ({ show, onClose }) => {
  const t = useTranslations('offer.new.confirmedModal')

  return (
    <Modal
      open={Boolean(show)}
      onClose={() => onClose?.()}
      renderTitle={() => <ModalTitle>{t('title')}</ModalTitle>}
      renderDescription={() => (
        <div className={clsx('flex', 'flex-col', 'gap-6')}>
          <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
          <div className={clsx('flex', 'items-center', 'justify-center')}>
            <ConfirmationIconSvg />
          </div>
          <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
            <button className={clsx('btn-gradient', 'group', 'w-40', 'py-1.5', 'h-10')} onClick={onClose}>
              <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
            </button>
            {/*FIXME offers are private so there's no any link to them*/}
            {/*<CopyToClipboard text={} onCopy={onClose}>*/}
            {/*  <button className={clsx('btn-action', 'group', 'w-40', 'py-1.5', 'h-10', 'gap-2.5')}>*/}
            {/*    <span className={clsx('text-purple-900', 'group-hover:text-white')}>*/}
            {/*      <CopyIconSvg />*/}
            {/*    </span>*/}
            {/*    <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('copyLinkBtn')}</span>*/}
            {/*  </button>*/}
            {/*</CopyToClipboard>*/}
          </div>
        </div>
      )}
    />
  )
}
