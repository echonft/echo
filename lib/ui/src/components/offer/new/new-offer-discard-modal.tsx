import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  open: boolean
  onClose?: VoidFunction
  onDiscard?: VoidFunction
}

export const NewOfferDiscardModal: FunctionComponent<Props> = ({ open, onClose, onDiscard }) => {
  const t = useTranslations('offer.new.discardModal')

  return (
    <Modal open={open} onClose={onClose} title={t('title')} minHeight={false}>
      <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
        <span className={'text-white text-center prose-header-xs-semi'}>{t('subtitle')}</span>
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('cancelBtn')}</span>
          </button>
          <LongPressButton
            id={'new-offer-discard-btn'}
            label={t('discardBtn')}
            message={t('discardBtnMessage')}
            onFinish={() => {
              onDiscard?.()
            }}
          />
        </div>
      </div>
    </Modal>
  )
}
