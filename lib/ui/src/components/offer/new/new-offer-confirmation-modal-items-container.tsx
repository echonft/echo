import { type OfferItem } from '@echo/model/types/offer-item'
import { ItemThumbnailsContainer } from '@echo/ui/components/item/thumbnail/layout/item-thumbnails-container'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
}

export const NewOfferConfirmationModalItemsContainer: FunctionComponent<Props> = ({ isReceiver, items = [] }) => {
  const t = useTranslations('offer.new.confirmationModal')
  const tShared = useTranslations('assets')
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
      <ItemThumbnailsContainer items={items} centered={true} />
    </div>
  )
}
