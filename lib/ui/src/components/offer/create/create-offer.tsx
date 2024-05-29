'use client'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { StateExpiration } from '@echo/ui/components/base/state-expiration'
import { NftCards } from '@echo/ui/components/nft/card/layout/nft-cards'
import { CreateOfferButtons } from '@echo/ui/components/offer/create/create-offer-buttons'
import { CreateOfferExpiration } from '@echo/ui/components/offer/create/create-offer-expiration'
import { CreateOfferSenderNfts } from '@echo/ui/components/offer/create/create-offer-sender-nfts'
import { CreateOfferSwapDirectionHeader } from '@echo/ui/components/offer/create/create-offer-swap-direction-header'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserDiscordTag } from '@echo/ui/components/user/profile/user-discord-tag'
import { UserProfileWallets } from '@echo/ui/components/user/profile/user-profile-wallets'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { SIZE_MD } from '@echo/ui/constants/size'
import { SWAP_DIRECTION_IN, SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import type { Selectable } from '@echo/ui/types/selectable'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { append, isEmpty, reject } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'

interface Props {
  receiver: User
  receiverItems: Nft[]
  senderNfts: Selectable<Nft>[]
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
  const [senderSelection, setSenderSelection] = useState<Selectable<Nft>[]>([])
  const [reviewing, setReviewing] = useState(false)
  // TODO Probably should change that, not the most beautiful
  const [settingExpiration, setSettingExpiration] = useState(false)
  const { username, discord, wallet } = receiver
  const selectSenderNft = useCallback(
    (nft: Selectable<Nft>) => {
      setSenderSelection(append(nft))
    },
    [setSenderSelection]
  )
  const unselectSenderNft = useCallback(
    (nft: Selectable<Nft>) => {
      setSenderSelection(reject(eqNft(nft)))
    },
    [setSenderSelection]
  )
  const nfts = useMemo(() => reject(isInWith(senderSelection, eqNft))(senderNfts), [senderSelection, senderNfts])

  if (settingExpiration) {
    return (
      <CreateOfferExpiration
        senderItems={senderSelection}
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
          <ProfilePicture alt={username} pictureUrl={discord.avatarUrl} size={SIZE_MD} />
          <UserDetailsDiscordTagAndWalletLayout>
            <UserDiscordTag discordUsername={discord.username} />
            <UserProfileWallets wallets={[wallet]} />
          </UserDetailsDiscordTagAndWalletLayout>
        </UserDetailsLayout>
        {/*  FIXME expiresAt value should be derived from state */}
        <StateExpiration
          expiresAt={dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix()}
          readOnly={false}
          state={OFFER_STATE_OPEN}
        />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-20')}>
        <CreateOfferSwapDirectionHeader direction={SWAP_DIRECTION_IN} />
        <div className={clsx('h-max', 'w-full', 'px-8')}>
          <NftCards
            nfts={receiverItems}
            alignment={ALIGNMENT_CENTER}
            cardOptions={{ style: { hideOpenSeaLink: true } }}
          />
        </div>
        <div className={clsx('pb-4')}>
          <ItemsSeparator />
        </div>
        <CreateOfferSwapDirectionHeader direction={SWAP_DIRECTION_OUT} />
        <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
          <CreateOfferSenderNfts
            nfts={nfts}
            selection={senderSelection}
            readOnly={reviewing}
            onSelect={selectSenderNft}
            onUnselect={unselectSenderNft}
          />
        </div>
        <div className={clsx('flex', 'flex-row', 'gap-8', 'justify-center', 'items-center', 'pb-5')}>
          <CreateOfferButtons
            readOnly={reviewing}
            disabled={!reviewing && isEmpty(senderSelection)}
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
