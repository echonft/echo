import { type ListingItem } from '@echo/model/types/listing-item'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
}

export const NewListingConfirmationModalItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const t = useTranslations('listing.new.confirmationModal')
  const tShared = useTranslations('assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <ModalSubtitle>{t('itemsSubtitle', { count: items.length })}</ModalSubtitle>
        <SwapDirectionHeader direction={SWAP_DIRECTION_OUT} title={tShared('out')} />
      </div>
      <NftsLayout alignment={ALIGNMENT_CENTER}>
        {map(
          (item) => (
            <NftThumbnail nft={item.nft} key={item.nft.id} />
          ),
          items
        )}
      </NftsLayout>
    </div>
  )
}
