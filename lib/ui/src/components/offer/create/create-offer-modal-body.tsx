'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ShowIfNilOrEmpty } from '@echo/ui/components/base/utils/show-if-nil-or-empty'
import type { NewOfferConfirmationModalProps } from '@echo/ui/components/offer/create/create-offer-modal'
import { CreateOfferModalItemsContainer } from '@echo/ui/components/offer/create/create-offer-modal-items-container'
import { CreateOfferReceiver } from '@echo/ui/components/offer/create/create-offer-receiver'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const CreateOfferModalBody: FunctionComponent<Omit<NewOfferConfirmationModalProps, 'open' | 'onClose'>> = ({
  receiver,
  receiverItems,
  senderItems,
  loading,
  onClear,
  onContinue,
  onComplete
}) => {
  const t = useTranslations('offer.create')
  if (isNil(receiverItems) && isNil(senderItems)) {
    return null
  }
  return (
    <div className={clsx('flex', 'flex-col', 'gap-12')}>
      <CreateOfferReceiver user={receiver} disabled={loading} />
      <CreateOfferModalItemsContainer receiverItems={receiverItems} senderItems={senderItems} disabled={loading} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <ShowIfNilOrEmpty checks={senderItems}>
          <InternalLink path={linkProvider.profile.items.get()}>
            <button
              className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
              onClick={onContinue}
              disabled={loading}
            >
              <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
            </button>
          </InternalLink>
        </ShowIfNilOrEmpty>
        <HideIfNilOrEmpty
          checks={senderItems}
          render={() => (
            <button
              className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
              onClick={onComplete}
              disabled={loading}
            >
              <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
            </button>
          )}
        />
        <LongPressButton
          id={'new-offer-confirmation-btn'}
          label={t('clearBtn')}
          message={t('clearBtnMessage')}
          loading={loading}
          onFinish={onClear}
        />
      </div>
    </div>
  )
}
