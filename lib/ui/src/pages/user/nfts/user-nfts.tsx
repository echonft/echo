'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import { UserNftsEmpty } from '@echo/ui/pages/user/nfts/user-nfts-empty'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { useTranslations } from 'next-intl'
import { assoc, dissoc, isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  nfts: Nft[]
}

export const UserNfts: FunctionComponent<Props> = ({ nfts }) => {
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

  if (isEmpty(nfts)) {
    return <UserNftsEmpty />
  }
  return (
    <SelectableNftGroupsAndFiltersContainer
      nfts={selectableNfts}
      availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
      btnLabel={t('button.label')}
      onButtonClick={onMakeOffer}
    />
  )
}
