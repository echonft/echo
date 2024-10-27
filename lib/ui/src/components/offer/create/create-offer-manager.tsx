'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { User, UserWithWallet } from '@echo/model/types/user'
import { CreateOfferFlow } from '@echo/ui/components/offer/create/create-offer-flow'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useRouter } from 'next/navigation'
import { assoc, isNil, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiver: UserWithWallet
  // TODO replace with items
  receiverNfts: OwnedNft[]
  receiverNftsSelection: NonEmptyArray<OwnedNft>
  sender: User
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
  const { address, chain } = useAccount()
  const senderWithWallet = assoc('wallet', { address, chain }, sender) as UserWithWallet
  if (isNil(createdOffer)) {
    return (
      // FIXME Need to adjust the values here
      <CreateOfferFlow
        receiver={receiver}
        receiverNfts={receiverNfts}
        receiverNftsSelection={receiverNftsSelection}
        sender={senderWithWallet}
        senderNfts={senderNfts}
        onCancel={() => {
          router.back()
        }}
      />
    )
  }

  return <CreatedOfferSwitch offer={assoc('role', OfferRole.Sender, createdOffer)} />
}
