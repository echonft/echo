import { NewItemsEmptyContainer } from '@echo/ui/components/item/empty/new-items-empty-container'
import { NewItemsContainer } from '@echo/ui/components/item/new/new-items-container'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
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
}

export const NewOfferBottomSliderInnerContainer: FunctionComponent<Props> = ({
  receiver,
  receiverItems,
  senderItems = [],
  onAddMoreSenderItem,
  onRemoveSenderItem,
  onAddMoreReceiverItem,
  onRemoveReceiverItem
}) => {
  const t = useTranslations('offer.new.bottomSlider')
  const [, setModalState] = useRecoilState(newOfferState)
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('pt-6', 'pb-1')}>
        <UserDetailsContainer user={receiver} userWalletAddress={receiver.wallet.address} />
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
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6')}>
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          disabled={isNilOrEmpty(receiverItems) || isNilOrEmpty(senderItems)}
          onClick={() => setModalState('TO CONFIRM')}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalize')}</span>
        </Disclosure.Button>
      </div>
    </div>
  )
}
