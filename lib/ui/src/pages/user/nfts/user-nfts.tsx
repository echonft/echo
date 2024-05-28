'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/selectable/selectable-nfts-with-filters'
import { getNewOfferPath } from '@echo/ui/helpers/offer/get-new-offer-path'
import { UserNftsEmpty } from '@echo/ui/pages/user/nfts/user-nfts-empty'
import { useRouter } from 'next/navigation'
import { bind, isEmpty, pipe } from 'ramda'

interface Props<T extends Nft> {
  nfts: T[]
}

export const UserNfts = <T extends Nft>({ nfts }: Props<T>) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const routerPush = bind(router.push, router)

  if (isEmpty(nfts)) {
    return <UserNftsEmpty />
  }
  return <SelectableNftsWithFilters nfts={nfts} onSelectionAction={pipe(getNewOfferPath, routerPush)} />
}
