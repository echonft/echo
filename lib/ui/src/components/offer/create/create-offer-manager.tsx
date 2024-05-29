'use client'
import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { CreateOffer } from '@echo/ui/components/offer/create/create-offer'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
import type { Selectable } from '@echo/ui/types/selectable'
import { useRouter } from 'next/navigation'
import { assoc, isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiver: User
  receiverItems: Nft[]
  senderNfts: Selectable<Nft>[]
}

export const CreateOfferManager: FunctionComponent<Props> = ({ receiver, receiverItems, senderNfts }) => {
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
  return <CreatedOfferSwitch offer={assoc('role', OFFER_ROLE_SENDER, createdOffer)} />
}
