'use client'
import type { Chain } from '@echo/model/constants/chain'
import type { OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { Profile } from '@echo/ui/components/base/profile'
import { SelectableNftsWithoutThumbnail } from '@echo/ui/components/nft/selectable/selectable-nfts-without-thumbnail'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import { WalletConnectedButton } from '@echo/ui/components/wallet/wallet-connected-button'
import clsx from 'clsx'
import { head, path, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: User & Required<Pick<User, 'wallet'>>
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const CreateTradeUserNftsSelection: FunctionComponent<Props> = ({
  user,
  nfts,
  selection,
  onSelect,
  onUnselect
}) => {
  const {
    discord: { avatarUrl },
    username,
    wallet
  } = user
  const chain = pipe<[OwnedNft[]], OwnedNft, Chain>(
    head,
    path<OwnedNft, 'collection', 'contract', 'chain'>(['collection', 'contract', 'chain'])
  )(nfts)
  return (
    <div className={clsx('flex', 'flex-col', 'gap-14')}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={user} />
          <WalletConnectedButton wallet={wallet} chain={chain} />
        </UserProfileDetailsLayout>
      </Profile>
      <SelectableNftsWithoutThumbnail
        nfts={nfts}
        selection={selection}
        options={{ owner: { hide: true } }}
        onSelect={onSelect}
        onUnselect={onUnselect}
      />
    </div>
  )
}
