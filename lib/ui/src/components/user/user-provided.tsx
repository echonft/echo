import { PaddedContainer } from '../layout/padded-container'
import { UserDetails } from './user-details'
import { UserNftsAndFiltersContainer } from './user-nfts-and-filters-container'
import { CollectionFilter, Nft, User } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface UserProvidedProps {
  user: User
  nfts: Nft[]
  filters: CollectionFilter[]
  isFetchingNfts?: boolean
  onFilterSelectionUpdate?: (selection: CollectionFilter[]) => unknown
  onMakeOfferForNft?: (id: string) => unknown
}

export const UserProvided: FunctionComponent<UserProvidedProps> = ({
  user,
  nfts,
  filters,
  isFetchingNfts,
  onFilterSelectionUpdate,
  onMakeOfferForNft
}) => {
  const { discordUsername, discordId, discordAvatar, discordBanner } = user
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-14')}>
        <UserDetails
          discordUsername={discordUsername}
          discordId={discordId}
          discordAvatar={discordAvatar}
          discordBanner={discordBanner}
        />
        <UserNftsAndFiltersContainer
          filters={filters}
          nfts={nfts}
          isFetchingNfts={isFetchingNfts}
          onMakeOfferForNft={onMakeOfferForNft}
          onFilterSelectionUpdate={onFilterSelectionUpdate}
        />
      </div>
    </PaddedContainer>
  )
}
