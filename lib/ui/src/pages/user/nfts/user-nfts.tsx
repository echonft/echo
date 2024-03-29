'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/selection/selectable-nfts-with-filters'
import { getNewOfferPathWithParams } from '@echo/ui/helpers/offer/get-new-offer-path-with-params'
import { UserNftsEmpty } from '@echo/ui/pages/user/nfts/user-nfts-empty'
import { useRouter } from 'next/navigation'
import { isEmpty } from 'ramda'

interface Props<T extends Nft> {
  nfts: T[]
}

export const UserNfts = <T extends Nft>({ nfts }: Props<T>) => {
  const router = useRouter()

  if (isEmpty(nfts)) {
    return <UserNftsEmpty />
  }

  return (
    <SelectableNftsWithFilters
      nfts={nfts}
      onSelectionAction={(selection) => router.push(getNewOfferPathWithParams(selection))}
    />
  )
}
