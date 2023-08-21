import { EditIconSvg } from '../base/svg/edit-icon-svg'
import { NewOfferConfirmationModalAssetsContainer } from './new-offer-confirmation-modal-assets-container'
import { OfferItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  onConfirm?: () => unknown
  onEdit?: () => unknown
}

export const NewOfferConfirmationModalInnerContainer: FunctionComponent<Props> = ({
  receiverItems,
  senderItems,
  onConfirm,
  onEdit
}) => {
  const t = useTranslations('offer.new.confirmationModal')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <NewOfferConfirmationModalAssetsContainer isReceiver items={receiverItems} />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      </div>
      <NewOfferConfirmationModalAssetsContainer isReceiver={false} items={senderItems} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <button className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onConfirm}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmButton')}</span>
        </button>
        <button
          className={clsx('btn-action', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'gap-2.5')}
          onClick={onEdit}
        >
          <span className={clsx('text-purple-900', 'group-hover:text-white')}>
            <EditIconSvg />
          </span>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('editButton')}</span>
        </button>
      </div>
    </div>
  )
}
