'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { CreateOfferFlow } from '@echo/ui/components/offer/create/create-offer-flow'
import { useRouter } from 'next/navigation'
import { type NonEmptyArray } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  receiver: User & Required<Pick<User, 'wallet'>>
  // TODO replace with items
  receiverNfts: OwnedNft[]
  receiverNftsSelection: NonEmptyArray<OwnedNft>
  sender: User & Required<Pick<User, 'wallet'>>
  // TODO replace with items
  senderNfts: OwnedNft[]
}

// TODO Refactor this, not very useful, its just for the onCancel, could all be in the flow
export const CreateOfferManager: FunctionComponent<Props> = ({
  sender,
  receiver,
  receiverNfts,
  receiverNftsSelection,
  senderNfts
}) => {
  const router = useRouter()
  return (
    <CreateOfferFlow
      receiver={receiver}
      receiverNfts={receiverNfts}
      receiverNftsSelection={receiverNftsSelection}
      sender={sender}
      senderNfts={senderNfts}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
