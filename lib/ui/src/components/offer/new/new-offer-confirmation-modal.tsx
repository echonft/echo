'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ShowIfNilOrEmpty } from '@echo/ui/components/base/utils/show-if-nil-or-empty'
import { NewOfferModalItemsContainer } from '@echo/ui/components/offer/new/new-offer-modal-items-container'
import { UserDetailsRoundedContainer } from '@echo/ui/components/shared/user-details-rounded-container'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  receiver: User
  receiverItems: OfferItem[]
  senderItems?: OfferItem[]
  open: boolean
  onClear?: VoidFunction
  onContinue?: VoidFunction
  onComplete?: VoidFunction
  onClose?: VoidFunction
}

export const NewOfferConfirmationModal: FunctionComponent<Props> = ({
  receiver,
  receiverItems,
  senderItems,
  open,
  onClear,
  onContinue,
  onComplete,
  onClose
}) => {
  const t = useTranslations('offer.new.confirmationModal')

  return (
    <Modal open={open} onBack={onClose} title={t('title')} onClose={onClose} backButtonLabel={t('backBtn')}>
      <div className={clsx('flex', 'flex-col', 'gap-12')}>
        <UserDetailsRoundedContainer user={receiver} />
        <NewOfferModalItemsContainer receiverItems={receiverItems} senderItems={senderItems} />
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <ShowIfNilOrEmpty checks={senderItems}>
            <InternalLink path={linkProvider.profile.items.get()}>
              <button
                className={clsx('btn-gradient', 'btn-size-alt', 'group', isNil(onContinue) && 'animate-pulse')}
                onClick={onContinue}
                disabled={isNil(onContinue)}
              >
                <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
              </button>
            </InternalLink>
          </ShowIfNilOrEmpty>
          <HideIfNilOrEmpty
            checks={senderItems}
            render={() => (
              <button
                className={clsx('btn-gradient', 'btn-size-alt', 'group', isNil(onComplete) && 'animate-pulse')}
                onClick={onComplete}
                disabled={isNil(onComplete)}
              >
                <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
              </button>
            )}
          />
          <LongPressButton
            id={'new-offer-confirmation-btn'}
            label={t('clearBtn')}
            message={t('clearBtnMessage')}
            loading={isNil(onClear)}
            onFinish={onClear}
          />
        </div>
      </div>
    </Modal>
  )
}
