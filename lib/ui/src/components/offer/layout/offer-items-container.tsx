import { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { AlignmentCenter, AlignmentLeft, AlignmentRight } from '@echo/ui/constants/alignment'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { map, prop } from 'ramda'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

interface Props {
  items: OfferItem[] | OfferItemResponse[]
  alignment?: typeof AlignmentLeft | typeof AlignmentCenter | typeof AlignmentRight
}

export const OfferItemsContainer: FunctionComponent<Props> = ({ alignment, items }) => {
  const nfts = useMemo(() => map(prop('nft'), items as OfferItem[]), [items])
  return <NftsContainer nfts={nfts} alignment={alignment} />
}
