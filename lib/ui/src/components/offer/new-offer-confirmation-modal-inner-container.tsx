import { Nft } from '../../types/nft'
import { EditIconSvg } from '../base/svg/edit-icon-svg'
import { NewOfferConfirmationModalAssetsContainer } from './new-offer-confirmation-modal-assets-container'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  receiverAssets: Nft[]
  senderAssets: Nft[]
  onConfirm?: () => void
  onEdit?: () => void
}

export const NewOfferConfirmationModalInnerContainer: FunctionComponent<Props> = ({
  receiverAssets,
  senderAssets,
  onConfirm,
  onEdit
}) => {
  const t = useTranslations('offer.new.confirmationModal')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <NewOfferConfirmationModalAssetsContainer isReceiver assets={receiverAssets} />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      </div>
      <NewOfferConfirmationModalAssetsContainer isReceiver={false} assets={senderAssets} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <button className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onConfirm}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmButton')}</span>
        </button>
        <button
          className={clsx('btn-action', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'gap-2.5')}
          onClick={onEdit}
        >
          <span>
            <EditIconSvg className={clsx('[&>path]:fill-purple-900', 'group-hover:[&>path]:fill-white')} />
          </span>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('editButton')}</span>
        </button>
      </div>
    </div>
  )
}
