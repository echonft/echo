import { ModalSubtitle } from '../../base/modal/modal-subtitle'
import { ItemThumbnail } from '../../item/item-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { DirectionIn, DirectionOut, OfferItem, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
}

export const NewOfferConfirmationModalItemsContainer: FunctionComponent<Props> = ({ isReceiver, items = [] }) => {
  const t = useTranslations('offer.new.confirmationModal')
  const tShared = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <ModalSubtitle>
          {t(isReceiver ? 'assetsInSubtitle' : 'assetsOutSubtitle', { count: items.length })}
        </ModalSubtitle>
        <SwapDirectionHeader
          direction={isReceiver ? DirectionIn : DirectionOut}
          title={tShared(isReceiver ? 'in' : 'out')}
        />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {items.map((item) => (
          <ItemThumbnail item={item} key={item.nft.id} size={SizeMD} />
        ))}
      </div>
    </div>
  )
}
