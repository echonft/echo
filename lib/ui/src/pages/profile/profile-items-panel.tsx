'use client'
import type { Nft } from '@echo/model/types/nft'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/filters/selectable-nfts-with-filters'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { getNewListingPathFromItems } from '@echo/ui/helpers/listing/get-new-listing-path-from-items'
import { TabPanel } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { bind, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  show?: boolean
}

export const ProfileItemsPanel: FunctionComponent<Props> = ({ nfts, show }) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const routerPush = bind(router.push, router)

  if (show) {
    return (
      <TabPanel>
        <SelectableNftsWithFilters
          nfts={nfts}
          sortBy={'collection'}
          action={NFT_ACTION_LISTING}
          onSelectionAction={pipe(getNewListingPathFromItems, routerPush)}
        />
      </TabPanel>
    )
  }
  return null
}
