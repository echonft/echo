'use client'
import { type OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { NewOfferModalItemsContainer } from '@echo/ui/components/offer/new/new-offer-modal-items-container'
import { UserDetailsRoundedContainer } from '@echo/ui/components/shared/user-details-rounded-container'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  receiver: User | undefined
  receiverItems: OfferItem[]
  senderItems?: OfferItem[]
  open: boolean
  onClear?: VoidFunction
  onContinue?: VoidFunction
  onClose?: VoidFunction
}

export const NewOfferConfirmationModal: FunctionComponent<Props> = ({
  receiver,
  receiverItems,
  senderItems,
  open,
  onClear,
  onContinue,
  onClose
}) => {
  const t = useTranslations('offer.new.confirmationModal')

  return (
    <Modal
      open={open}
      onBack={() => onClose?.()}
      title={t('title')}
      onClose={() => onClose?.()}
      backButtonLabel={t('backBtn')}
      backDisabled={false}
    >
      <div className={clsx('flex', 'flex-col', 'gap-12', 'min-w-96')}>
        <HideIfNil checks={receiver} render={(user) => <UserDetailsRoundedContainer user={user} />} />
        <NewOfferModalItemsContainer receiverItems={receiverItems} senderItems={senderItems} />
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onContinue}>
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
          </button>
          <button className={clsx('btn-action', 'btn-size-alt', 'group')} onClick={onClear}>
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('clearBtn')}</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}
