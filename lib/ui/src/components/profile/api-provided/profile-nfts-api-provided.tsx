'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileNftsEmpty } from '@echo/ui/components/profile/nft/empty/profile-nfts-empty'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { assoc, dissoc, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  nfts: Nft[]
  user: AuthUser
}

export const ProfileNftsApiProvided: FunctionComponent<Props> = ({ nfts, user }) => {
  const t = getTranslator()
  const { hasNewOfferPending } = useNewOfferStore()
  const selectableNfts = useMemo(() => {
    if (hasNewOfferPending()) {
      return map<Nft, SelectableNft>(assoc('actionDisabled', true), nfts)
    }
    return map<Nft, SelectableNft>(
      pipe<[Nft], SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_LISTING), dissoc('actionDisabled')),
      nfts
    )
  }, [nfts, hasNewOfferPending])

  // TODO set the right label for the button and hook the action
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_ITEMS} user={user}>
      <HideIfEmpty
        checks={selectableNfts}
        render={(selectableNfts) => (
          <SelectableNftGroupsAndFiltersContainer
            nfts={selectableNfts}
            availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
            btnLabel={t('profile.button.label')}
            hideOwner={true}
          />
        )}
      />
      <ShowIfEmpty checks={selectableNfts}>
        <ProfileNftsEmpty user={user} />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
