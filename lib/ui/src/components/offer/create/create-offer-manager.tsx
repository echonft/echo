'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import type { UserProfile } from '@echo/model/types/user-profile'
import { CreateOfferFlow } from '@echo/ui/components/offer/create/create-offer-flow'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
import { useRouter } from 'next/navigation'
import { assoc, dissoc, isNil, type NonEmptyArray, pipe } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiver: User
  // TODO replace with items
  receiverNfts: OwnedNft[]
  receiverNftsSelection: NonEmptyArray<OwnedNft>
  // TODO set this to Omit<User, 'wallet'> and get the connected wallet
  sender: UserProfile
  // TODO replace with items
  senderNfts: OwnedNft[]
}

export const CreateOfferManager: FunctionComponent<Props> = ({
  sender,
  receiver,
  receiverNfts,
  receiverNftsSelection,
  senderNfts
}) => {
  const router = useRouter()
  const [createdOffer] = useState<Offer>()
  // TODO
  // const [createdOffer, setCreatedOffer] = useState<Offer>()
  // TODO get the connected wallet from the hook
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallet = sender.wallets[0]!
  if (isNil(createdOffer)) {
    return (
      // FIXME Need to adjust the values here
      <CreateOfferFlow
        receiver={receiver}
        receiverNfts={receiverNfts}
        receiverNftsSelection={receiverNftsSelection}
        sender={pipe(dissoc('wallets'), assoc('wallet', wallet))(sender)}
        senderNfts={senderNfts}
        onCancel={() => {
          router.back()
        }}
        loading={false}
      />
    )
  }

  return <CreatedOfferSwitch offer={assoc('role', OfferRole.Sender, createdOffer)} />
}
