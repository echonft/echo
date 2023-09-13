import { NewItemsEmptyContainer } from '@echo/ui/components/item/empty/new-items-empty-container'
import { NewItemsContainer } from '@echo/ui/components/item/new/new-items-container'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import { getOfferItemsWallet } from '@echo/ui/helpers/offer/get-offer-items-wallet'
import { newOfferState } from '@echo/ui/services/state'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { User } from '@echo/ui/types/model/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  receiver: User
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  onAddMoreSenderItem?: () => unknown
  onRemoveSenderItem?: (itemNftId: string) => unknown
  onAddMoreReceiverItem?: () => unknown
  onRemoveReceiverItem?: (itemNftId: string) => unknown
  onConfirmOffer?: () => unknown
  onDismissOffer?: () => unknown
}

export const NewOfferBottomSliderInnerContainer: FunctionComponent<Props> = ({
  receiver,
  receiverItems,
  senderItems = [],
  onAddMoreSenderItem,
  onRemoveSenderItem,
  onAddMoreReceiverItem,
  onRemoveReceiverItem,
  onConfirmOffer,
  onDismissOffer
}) => {
  const t = useTranslations('offer.new.bottomSlider')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('pt-6', 'pb-1')}>
        <UserDetailsContainer user={receiver} userWalletAddress={getOfferItemsWallet(receiverItems).address} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-8')}>
        <NewItemsContainer
          isReceiver
          items={receiverItems}
          onAddMore={onAddMoreReceiverItem}
          onRemove={onRemoveReceiverItem}
          renderEmpty={() => <NewItemsEmptyContainer onAddMore={onAddMoreReceiverItem} />}
        />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      </div>
      <NewItemsContainer
        isReceiver={false}
        items={senderItems}
        onAddMore={onAddMoreSenderItem}
        onRemove={onRemoveSenderItem}
        renderEmpty={() => <NewItemsEmptyContainer onAddMore={onAddMoreSenderItem} />}
      />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6', 'gap-5')}>
        {/*TODO Here we should add a fetcher to update. We don't need the state for modal, we can use offer id */}
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          disabled={isNilOrEmpty(receiverItems) || isNilOrEmpty(senderItems)}
          onClick={onConfirmOffer}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalize')}</span>
        </Disclosure.Button>
        <button
          className={clsx('bg-red-400', 'disabled:bg-red-400/40', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          onClick={onDismissOffer}
        >
          <span
            className={clsx(
              'prose-label-lg',
              'text-dark-500',
              'group-active:group-hover:text-white',
              'group-disabled:text-dark-500'
            )}
          >
            {t('dismissBtn')}
          </span>
        </button>
      </div>
    </div>
  )
}
