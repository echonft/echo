import { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { map, prop } from 'ramda'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

interface Props {
  items: OfferItem[] | OfferItemResponse[]
}

export const OfferItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const nfts = useMemo(() => map(prop('nft'), items as OfferItem[]), [items])
  return <NftsContainer nfts={nfts} />
}
