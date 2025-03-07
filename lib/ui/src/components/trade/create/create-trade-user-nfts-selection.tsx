'use client'
import type { OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { Profile } from '@echo/ui/components/base/profile/profile'
import { WalletCopyToClipboardButton } from '@echo/ui/components/base/wallet/wallet-copy-to-clipboard-button'
import { CreateTradeUserNfts } from '@echo/ui/components/trade/create/create-trade-user-nfts'
import { UserProfileDetailsLayout } from '@echo/ui/components/user/profile/layout/user-profile-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import clsx from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: User
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => void
  onUnselect?: (nft: OwnedNft) => void
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

  return (
    <div className={clsx('flex', 'flex-col', 'gap-14')}>
      <Profile picture={{ pictureUrl: avatarUrl, alt: username }}>
        <UserProfileDetailsLayout>
          <UserTag user={user} />
          <WalletCopyToClipboardButton wallet={wallet} />
        </UserProfileDetailsLayout>
      </Profile>
      <CreateTradeUserNfts
        nfts={nfts}
        selection={selection}
        options={{ owner: { hide: true } }}
        onSelect={onSelect}
        onUnselect={onUnselect}
      />
    </div>
  )
}
