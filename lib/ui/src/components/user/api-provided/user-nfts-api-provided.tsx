'use client'
import { type Nft } from '@echo/model/types/nft'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserNftsEmpty } from '@echo/ui/components/user/nft/empty/user-nfts-empty'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { useTranslations } from 'next-intl'
import { assoc, dissoc, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  username: string
  nfts: Nft[]
}

export const UserNftsApiProvided: FunctionComponent<Props> = ({ username, nfts }) => {
  const t = useTranslations('user')
  const { hasNewOfferPending, setReceiverItems, openModal } = useNewOfferStore()
  const selectableNfts = useMemo(() => {
    if (hasNewOfferPending) {
      return map<Nft, SelectableNft>(assoc('actionDisabled', true), nfts)
    }
    return map<Nft, SelectableNft>(
      pipe<[Nft], SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_OFFER), dissoc('actionDisabled')),
      nfts
    )
  }, [nfts, hasNewOfferPending])

  const onMakeOffer = (nfts: SelectableNft[]) => {
    if (isNonEmptyArray(nfts)) {
      setReceiverItems(map(mapNftToItem, nfts))
      openModal()
    }
  }

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_ITEMS}>
      <HideIfEmpty
        checks={selectableNfts}
        render={(selectableNfts) => (
          <SelectableNftGroupsAndFiltersContainer
            nfts={selectableNfts}
            availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
            btnLabel={t('button.label')}
            onButtonClick={onMakeOffer}
          />
        )}
      />
      <ShowIfEmpty checks={selectableNfts}>
        <UserNftsEmpty />
      </ShowIfEmpty>
    </UserNavigationLayout>
  )
}
