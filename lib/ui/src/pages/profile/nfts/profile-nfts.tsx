'use client'
import type { Nft } from '@echo/model/types/nft'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/filters/layout/selectable-nfts-with-filters'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { getNewListingPathFromItems } from '@echo/ui/helpers/listing/get-new-listing-path-from-items'
import { ProfileNftsEmpty } from '@echo/ui/pages/profile/nfts/profile-nfts-empty'
import { useRouter } from 'next/navigation'
import { bind, isEmpty, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
}

export const ProfileNfts: FunctionComponent<Props> = ({ nfts }) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const routerPush = bind(router.push, router)

  if (isEmpty(nfts)) {
    return <ProfileNftsEmpty />
  }
  return (
    <SelectableNftsWithFilters
      nfts={nfts}
      sortBy={'collection'}
      action={NFT_ACTION_LISTING}
      onSelectionAction={pipe(getNewListingPathFromItems, routerPush)}
    />
  )
}
