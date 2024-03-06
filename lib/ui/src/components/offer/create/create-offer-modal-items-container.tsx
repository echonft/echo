import { type OfferItem } from '@echo/model/types/offer-item'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  receiverItems: OfferItem[]
  senderItems?: OfferItem[]
  disabled?: boolean
}

export const CreateOfferModalItemsContainer: FunctionComponent<Props> = ({ receiverItems, senderItems, disabled }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4.5', 'items-center')}>
      <CardsLayout alignment={ALIGNMENT_CENTER}>
        {map(
          (item) => (
            <NftThumbnail nft={item.nft} key={item.nft.id} disabled={disabled} />
          ),
          receiverItems
        )}
      </CardsLayout>
      <HideIfNilOrEmpty checks={senderItems} render={() => <ItemsSeparator disabled={disabled} />} />
      <HideIfNilOrEmpty
        checks={senderItems}
        render={(items) => (
          <CardsLayout alignment={ALIGNMENT_CENTER}>
            {map(
              (item) => (
                <NftThumbnail nft={item.nft} key={item.nft.id} disabled={disabled} />
              ),
              items
            )}
          </CardsLayout>
        )}
      />
    </div>
  )
}
