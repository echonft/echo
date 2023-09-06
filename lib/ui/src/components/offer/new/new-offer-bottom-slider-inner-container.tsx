import { newOfferState } from '../../../services/state'
import { NewItemsContainer } from '../../item/new-items-container'
import { NewItemsEmptyContainer } from '../../item/new-items-empty-container'
import { OfferReceiverDetailsContainer } from '../offer-receiver-details-container'
import { OfferItem, User } from '@echo/ui-model'
import { isNilOrEmpty } from '@echo/utils'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  receiver: User
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  onAddMoreSenderItem?: () => unknown
  onRemoveSenderItem?: (item: OfferItem) => unknown
  onAddMoreReceiverItem?: () => unknown
  onRemoveReceiverItem?: (item: OfferItem) => unknown
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
        <OfferReceiverDetailsContainer receiver={receiver} receiverWalletAddress={receiver.wallet.address} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-8')}>
        <NewItemsContainer
          isReceiving
          items={receiverItems}
          onAddMore={onAddMoreReceiverItem}
          onRemove={onRemoveReceiverItem}
          renderEmpty={() => <NewItemsEmptyContainer onAddMore={onAddMoreReceiverItem} />}
        />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      </div>
      <NewItemsContainer
        isReceiving={false}
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
