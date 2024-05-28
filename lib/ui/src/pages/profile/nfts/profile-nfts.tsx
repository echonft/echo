'use client'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/selectable/selectable-nfts-with-filters'
import { getNewListingPathFromItems } from '@echo/ui/helpers/listing/get-new-listing-path-from-items'
import { ProfileNftsEmpty } from '@echo/ui/pages/profile/nfts/profile-nfts-empty'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { useRouter } from 'next/navigation'
import { bind, isEmpty, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: SelectableNft[]
}

export const ProfileNfts: FunctionComponent<Props> = ({ nfts }) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const routerPush = bind(router.push, router)

  if (isEmpty(nfts)) {
    return <ProfileNftsEmpty />
  }
  return <SelectableNftsWithFilters nfts={nfts} onSelectionAction={pipe(getNewListingPathFromItems, routerPush)} />
}
