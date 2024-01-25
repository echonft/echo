'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Collection } from '@echo/model/types/collection'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNftsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nfts-and-filters-container'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { setSelectableNftActionDisabledPropFromAuthUser } from '@echo/ui/helpers/nft/set-selectable-nft-action-disabled-prop-from-auth-user'
import { setSelectableNftSelectionDisabledPropFromAuthUser } from '@echo/ui/helpers/nft/set-selectable-nft-selection-disabled-prop-from-auth-user'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import { CollectionNftsEmpty } from '@echo/ui/pages/collection/nfts/collection-nfts-empty'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { useTranslations } from 'next-intl'
import { assoc, isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  collection: Collection
  nfts: Nft[]
  user: AuthUser | undefined
}

export const CollectionNfts: FunctionComponent<Props> = ({ collection, nfts, user }) => {
  const t = useTranslations('collection')
  const { hasNewOfferPending, openModal: openNewOfferModal, setReceiverItems } = useNewOfferStore()
  const { openModal: openNewListingModal, setTarget } = useNewListingStore()
  const selectableNfts = useMemo(() => {
    if (hasNewOfferPending) {
      return map<Nft, SelectableNft>(
        pipe<[Nft], SelectableNft, SelectableNft>(
          assoc('actionDisabled', true),
          setSelectableNftSelectionDisabledPropFromAuthUser(user)
        ),
        nfts
      )
    }
    return map<Nft, SelectableNft>(
      pipe<[Nft], SelectableNft, SelectableNft, SelectableNft>(
        assoc('action', NFT_ACTION_OFFER),
        setSelectableNftSelectionDisabledPropFromAuthUser(user),
        setSelectableNftActionDisabledPropFromAuthUser(user)
      ),
      nfts
    )
  }, [nfts, user, hasNewOfferPending])
  const onMakeOffer = (nfts: SelectableNft[]) => {
    if (isNonEmptyArray(nfts)) {
      setReceiverItems(map(mapNftToItem, nfts))
      openNewOfferModal()
    }
  }
  const onMakeListing = () => {
    setTarget({ collection, amount: 1 })
    openNewListingModal()
  }

  if (isEmpty(nfts)) {
    return <CollectionNftsEmpty />
  }
  return (
    <SelectableNftsAndFiltersContainer
      nfts={selectableNfts}
      availableFilters={[NFT_FILTER_TRAITS]}
      emptyBtnLabel={t('button.createListing')}
      btnLabel={t('button.createOffer')}
      user={user}
      onButtonClick={onMakeOffer}
      onEmptyButtonClick={onMakeListing}
    />
  )
}
