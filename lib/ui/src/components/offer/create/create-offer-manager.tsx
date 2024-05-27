'use client'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { CreateOffer } from '@echo/ui/components/offer/create/create-offer'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { useRouter } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiver: User
  receiverItems: Nft[]
  senderNfts: SelectableNft[]
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
  return <CreatedOfferCreated count={createdOffer.senderItems.length} slug={createdOffer.slug} />
}
