import { ItemThumbnail } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { SizeMD } from '@echo/ui/constants/size'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

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
