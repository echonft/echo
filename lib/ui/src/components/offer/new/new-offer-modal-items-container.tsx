import { type OfferItem } from '@echo/model/types/offer-item'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  receiverItems: OfferItem[]
  senderItems?: OfferItem[]
}

export const NewOfferModalItemsContainer: FunctionComponent<Props> = ({ receiverItems, senderItems }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4.5', 'items-center')}>
      <NftsLayout alignment={ALIGNMENT_CENTER}>
        {map(
          (item) => (
            <NftThumbnail nft={item.nft} key={item.nft.id} />
          ),
          receiverItems
        )}
      </NftsLayout>
      <HideIfNilOrEmpty checks={senderItems} render={() => <ItemsSeparator />} />
      <HideIfNilOrEmpty
        checks={senderItems}
        render={(items) => (
          <NftsLayout alignment={ALIGNMENT_CENTER}>
            {map(
              (item) => (
                <NftThumbnail nft={item.nft} key={item.nft.id} />
              ),
              items
            )}
          </NftsLayout>
        )}
      />
    </div>
  )
}
