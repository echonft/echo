'use client'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  open: boolean
  onClose?: VoidFunction
  onDiscard?: VoidFunction
}

export const CreateListingDiscardModal: FunctionComponent<Props> = ({ open, onClose, onDiscard }) => {
  const t = useTranslations('listing.create.discardModal')

  return (
    <Modal open={open} onClose={onClose} title={t('title')}>
      <div className={classes('flex', 'flex-col', 'gap-12', 'items-center')}>
        <span className={'text-white text-center prose-header-xs-semi'}>{t('subtitle')}</span>
        <div className={classes('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <button className={classes('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
            <span className={classes('prose-label-lg', 'btn-label-gradient')}>{t('cancelBtn')}</span>
          </button>
          <LongPressButton
            id={'new-offer-discard-btn'}
            label={t('discardBtn')}
            message={t('discardBtnMessage')}
            onFinish={onDiscard}
          />
        </div>
      </div>
    </Modal>
  )
}
