'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/selection/selectable-nfts-with-filters'
import { UserNftsEmpty } from '@echo/ui/pages/user/nfts/user-nfts-empty'
import { isEmpty } from 'ramda'

interface Props<T extends Nft> {
  nfts: T[]
}

export const UserNfts = <T extends Nft>({ nfts }: Props<T>) => {
  if (isEmpty(nfts)) {
    return <UserNftsEmpty />
  }
  // TODO onSelectionAction={}
  return <SelectableNftsWithFilters nfts={nfts} />
}
