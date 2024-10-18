'use client'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import type { User } from '@echo/model/types/user/user'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { CreateOfferButtons } from '@echo/ui/components/offer/create/create-offer-buttons'
import { CreateOfferExpiration } from '@echo/ui/components/offer/create/create-offer-expiration'
import { CreateOfferSenderNfts } from '@echo/ui/components/offer/create/create-offer-sender-nfts'
import { CreateOfferSwapDirectionHeader } from '@echo/ui/components/offer/create/create-offer-swap-direction-header'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserProfileWallets } from '@echo/ui/components/user/profile/user-profile-wallets'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import { Alignment } from '@echo/ui/constants/alignments'
import { Size } from '@echo/ui/constants/size'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import { clsx } from 'clsx'
import { isEmpty, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiver: User
  receiverItems: NonEmptyArray<OwnedNft>
  senderNfts: OwnedNft[]
  loading?: boolean
  onCancel?: VoidFunction
  onComplete?: (offer: Offer) => void
}

export const CreateOffer: FunctionComponent<Props> = ({
  receiver,
  receiverItems,
  senderNfts,
  loading,
  onCancel,
  onComplete
}) => {
  const { nfts, selection, selectNft, unselectNft } = useNfts({ nfts: senderNfts, sortBy: 'collection' })
  const [reviewing, setReviewing] = useState(false)
  // TODO Probably should change that, not the most beautiful
  const [settingExpiration, setSettingExpiration] = useState(false)
  const { username, discord, wallet } = receiver

  if (settingExpiration) {
    return (
      <CreateOfferExpiration
        senderItems={selection.nfts as NonEmptyArray<OwnedNft>}
        receiverItems={receiverItems}
        onCancel={() => {
          setSettingExpiration(false)
          setReviewing(false)
        }}
        onComplete={onComplete}
        loading={loading}
      />
    )
  }

  return (
    <div className={clsx('flex', 'flex-col', 'gap-24')}>
      <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
        <UserDetailsLayout>
          <ProfilePicture alt={username} pictureUrl={discord.avatarUrl} size={Size.MD} />
          <UserDetailsDiscordTagAndWalletLayout>
            <UserTag user={receiver} />
            <UserProfileWallets wallets={[wallet]} />
          </UserDetailsDiscordTagAndWalletLayout>
        </UserDetailsLayout>
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-20')}>
        <CreateOfferSwapDirectionHeader direction={SwapDirection.In} />
        <div className={clsx('h-max', 'w-full', 'px-8')}>
          <NftCards
            nfts={receiverItems}
            alignment={Alignment.Center}
            cardOptions={{ style: { hideOpenSeaLink: true } }}
          />
        </div>
        <div className={clsx('pb-4')}>
          <ItemsSeparator />
        </div>
        <CreateOfferSwapDirectionHeader direction={SwapDirection.Out} />
        <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
          <CreateOfferSenderNfts
            nfts={nfts}
            selection={selection.nfts}
            readOnly={reviewing}
            onSelect={selectNft}
            onUnselect={unselectNft}
          />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-8', 'justify-center', 'items-center', 'pb-5')}>
          <CreateOfferButtons
            readOnly={reviewing}
            disabled={!reviewing && isEmpty(selection.nfts)}
            loading={loading}
            onComplete={() => {
              if (reviewing) {
                setSettingExpiration(true)
              } else {
                setReviewing(true)
              }
            }}
            onCancel={() => {
              if (reviewing) {
                setReviewing(false)
              } else {
                onCancel?.()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
