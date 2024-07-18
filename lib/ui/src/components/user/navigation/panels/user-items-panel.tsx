'use client'
import type { Nft } from '@echo/model/types/nft'
import { NftsWithFilters } from '@echo/ui/components/nft/filters/nfts-with-filters'
import { SelectableNftsWithFilters } from '@echo/ui/components/nft/filters/selectable-nfts-with-filters'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { getNewOfferPath } from '@echo/ui/helpers/offer/get-new-offer-path'
import { TabPanel } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { bind, objOf, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  isAuthUser: boolean
  nfts: Nft[]
  show?: boolean
}

export const UserItemsPanel: FunctionComponent<Props> = ({ isAuthUser, nfts, show }) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const routerPush = bind(router.push, router)

  if (show) {
    if (isAuthUser) {
      return (
        <TabPanel>
          <NftsWithFilters nfts={nfts} sortBy={'collection'} cardOptions={{ owner: { hide: true } }} />
        </TabPanel>
      )
    }
    return (
      <TabPanel>
        <SelectableNftsWithFilters
          nfts={nfts}
          action={NFT_ACTION_OFFER}
          sortBy={'collection'}
          onSelectionAction={pipe(objOf('items'), getNewOfferPath, routerPush)}
        />
      </TabPanel>
    )
  }
  return null
}
