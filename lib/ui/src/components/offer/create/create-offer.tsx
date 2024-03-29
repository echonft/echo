'use client'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import { withCollectionEquals } from '@echo/ui/comparators/with-collection-equals'
import { withIdEquals } from '@echo/ui/comparators/with-id-equals'
import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { NftCards } from '@echo/ui/components/nft/card/layout/nft-cards'
import { CreateOfferButtons } from '@echo/ui/components/offer/create/create-offer-buttons'
import { CreateOfferSenderNfts } from '@echo/ui/components/offer/create/create-offer-sender-nfts'
import { OfferDetailsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-buttons-layout'
import { OfferDetailsInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-info-layout'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsItemsSeparator } from '@echo/ui/components/offer/details/offer-details-items-separator'
import { OfferDetailsStateExpiration } from '@echo/ui/components/offer/details/offer-details-state-expiration'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserDiscordTag } from '@echo/ui/components/user/profile/user-discord-tag'
import { UserProfileWallets } from '@echo/ui/components/user/profile/user-profile-wallets'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { SIZE_MD } from '@echo/ui/constants/size'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { always, append, filter, isEmpty, map, pipe, prop, reject, unless } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'

interface Props {
  receiver: User
  receiverItems: OfferItem[]
  senderNfts: SelectableNft[]
  loading?: boolean
  onCancel?: VoidFunction
  onComplete?: (senderSelection: SelectableNft[]) => void
}

export const CreateOffer: FunctionComponent<Props> = ({
  receiver,
  receiverItems,
  senderNfts,
  loading,
  onCancel,
  onComplete
}) => {
  const [senderSelection, setSenderSelection] = useState<SelectableNft[]>([])
  const [reviewing, setReviewing] = useState(false)
  const { username, discord, wallet } = receiver
  const selectSenderNft = useCallback(
    (nft: SelectableNft) => {
      setSenderSelection(append(nft))
    },
    [setSenderSelection]
  )
  const unselectSenderNft = useCallback(
    (nft: SelectableNft) => {
      setSenderSelection(reject(withIdEquals(nft)))
    },
    [setSenderSelection]
  )
  const nfts = useMemo(
    () =>
      pipe<[SelectableNft[]], SelectableNft[], SelectableNft[]>(
        unless<SelectableNft[], SelectableNft[]>(
          always(isEmpty(senderSelection)),
          filter(isInWith<SelectableNft>(senderSelection, withCollectionEquals))
        ),
        reject(isInWith(senderSelection, withIdEquals))
      )(senderNfts),
    [senderSelection, senderNfts]
  )

  return (
    <OfferDetailsLayout>
      <OfferDetailsInfoLayout>
        <UserDetailsLayout>
          <ProfilePicture alt={username} pictureUrl={discord.avatarUrl} size={SIZE_MD} />
          <UserDetailsDiscordTagAndWalletLayout>
            <UserDiscordTag discordUsername={discord.username} />
            <UserProfileWallets wallets={[wallet]} />
          </UserDetailsDiscordTagAndWalletLayout>
        </UserDetailsLayout>
        <OfferDetailsStateExpiration
          expiresAt={dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix()}
          readOnly={false}
          state={OFFER_STATE_OPEN}
        />
      </OfferDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <div className={clsx('h-max', 'w-full', 'px-8')}>
          <NftCards
            nfts={map(prop('nft'), receiverItems)}
            alignment={ALIGNMENT_CENTER}
            cardOptions={{ style: { hideOpenSeaLink: true } }}
          />
        </div>
        <OfferDetailsItemsSeparator />
        <CreateOfferSenderNfts
          nfts={nfts}
          selection={senderSelection}
          readOnly={reviewing}
          onSelect={selectSenderNft}
          onUnselect={unselectSenderNft}
        />
        <OfferDetailsButtonsLayout>
          <CreateOfferButtons
            readOnly={reviewing}
            disabled={!reviewing && isEmpty(senderSelection)}
            loading={loading}
            onComplete={() => {
              if (reviewing) {
                onComplete?.(senderSelection)
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
        </OfferDetailsButtonsLayout>
      </OfferDetailsItemsButtonsLayout>
    </OfferDetailsLayout>
  )
}
