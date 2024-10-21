'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import type { User } from '@echo/model/types/user/user'
import type { UserProfile } from '@echo/model/types/user/user-profile'
import { CreateOfferFlow } from '@echo/ui/components/offer/create/create-offer-flow'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
import type { PageLayoutBackgroundPickerProps } from '@echo/ui/types/props/page-layout-background-picker-props'
import { useRouter } from 'next/navigation'
import { assoc, isNil, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props extends PageLayoutBackgroundPickerProps {
  receiver: User
  receiverNfts: OwnedNft[]
  receiverNftsSelection: NonEmptyArray<OwnedNft>
  sender: UserProfile
  senderNfts: OwnedNft[]
}

export const CreateOfferManager: FunctionComponent<Props> = ({
  sender,
  receiver,
  receiverNftsSelection,
  senderNfts,
  onPageBackgroundUpdate
}) => {
  const router = useRouter()
  const [createdOffer, setCreatedOffer] = useState<Offer>()

  if (isNil(createdOffer)) {
    return (
      // FIXME Need to adjust the values here
      <CreateOfferFlow
        receiver={receiver}
        receiverNfts={receiverNftsSelection}
        // FIXME Need to streamline this model
        sender={{ ...sender, wallet: sender.wallets[0]! }}
        senderNfts={senderNfts}
        onCancel={() => {
          router.back()
        }}
        loading={false}
      />
    )
  }

  return (
    <CreatedOfferSwitch
      offer={assoc('role', OfferRole.Sender, createdOffer)}
      onPageBackgroundUpdate={onPageBackgroundUpdate}
    />
  )
}
