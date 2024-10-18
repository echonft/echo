'use client'
import { OfferRole } from '@echo/model/constants/offer-role'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import type { User } from '@echo/model/types/user/user'
import { CreateOffer } from '@echo/ui/components/offer/create/create-offer'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
import type { PageLayoutBackgroundPickerProps } from '@echo/ui/types/props/page-layout-background-picker-props'
import { useRouter } from 'next/navigation'
import { assoc, isNil, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props extends PageLayoutBackgroundPickerProps {
  receiver: User
  receiverItems: NonEmptyArray<OwnedNft>
  senderNfts: OwnedNft[]
}

export const CreateOfferManager: FunctionComponent<Props> = ({
  receiver,
  receiverItems,
  senderNfts,
  onPageBackgroundUpdate
}) => {
  const router = useRouter()
  const [createdOffer, setCreatedOffer] = useState<Offer>()

  if (isNil(createdOffer)) {
    return (
      <CreateOffer
        receiver={receiver}
        receiverItems={receiverItems}
        senderNfts={senderNfts}
        onComplete={setCreatedOffer}
        onCancel={() => {
          router.back()
        }}
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
