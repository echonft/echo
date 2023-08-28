import { ModalSubtitle } from '../../base/modal/modal-subtitle'
import { OfferItemThumbnail } from '../../offer-item/offer-item-thumbnail'
import { NewOfferItemTitle } from './new-offer-item-title'
import { OfferItem, SizeMD } from '@echo/ui-model'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
}

export const NewOfferConfirmationModalItemsContainer: FunctionComponent<Props> = ({ isReceiver, items = [] }) => {
  const t = useTranslations('offer.misc')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <ModalSubtitle>
          {t(isReceiver ? 'assetsInSubtitle' : 'assetsOutSubtitle', { count: items.length })}
        </ModalSubtitle>
        <NewOfferItemTitle isReceiving={isReceiver} title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')} />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {items.map((item) => (
          <OfferItemThumbnail item={item} key={item.nft.id} size={SizeMD} />
        ))}
      </div>
    </div>
  )
}
