'use client'

import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { User } from '@echo/model/types/user'
import { Profile } from '@echo/ui/components/base/profile'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import clsx from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: User
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const CreateOfferUserNftsSelection: FunctionComponent<Props> = ({
  user,
  nfts,
  selection,
  onSelect,
  onUnselect
}) => {
  const {
    discord: { avatarUrl },
    username
    // wallet
  } = user
  return (
    <div className={clsx('flex', 'flex-col', 'gap-14')}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={user} />
          {/*<WalletConnectedButton address={address} chain={chain} />*/}
        </UserProfileDetailsLayout>
      </Profile>
      <SelectableNfts
        nfts={nfts}
        selection={selection}
        options={{ owner: { hide: true } }}
        style={{ selectionContainer: { minWitdh: true } }}
        onSelect={onSelect}
        onUnselect={onUnselect}
      />
    </div>
  )
}
