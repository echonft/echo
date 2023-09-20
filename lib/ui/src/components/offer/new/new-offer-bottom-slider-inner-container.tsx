import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { NewReceiverItemsContainer } from '@echo/ui/components/item/new/new-receiver-items-container'
import { NewSenderItemsContainer } from '@echo/ui/components/item/new/new-sender-items-container'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  onRemoveSenderItem?: (itemNftId: string) => unknown
  onRemoveReceiverItem?: (itemNftId: string) => unknown
  onConfirmOffer?: () => unknown
  onDismissOffer?: () => unknown
}

export const NewOfferBottomSliderInnerContainer: FunctionComponent<Props> = ({
  receiverItems,
  senderItems,
  onRemoveSenderItem,
  onRemoveReceiverItem,
  onConfirmOffer,
  onDismissOffer
}) => {
  const t = useTranslations('offer.new.bottomSlider')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <HideIfEmpty
        checks={receiverItems}
        render={(receiverItems) => (
          <div className={clsx('pt-6', 'pb-1')}>
            <UserDetailsContainer user={head<OfferItem, OfferItem>(receiverItems).nft.owner} />
          </div>
        )}
      />
      <div className={clsx('flex', 'flex-col', 'gap-8')}>
        <NewReceiverItemsContainer items={receiverItems} onRemove={onRemoveReceiverItem} />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      </div>
      <NewSenderItemsContainer items={senderItems} onRemove={onRemoveSenderItem} />
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
