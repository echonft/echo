'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { CreateOfferFlow } from '@echo/ui/components/offer/create/create-offer-flow'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useRouter } from 'next/navigation'
import { assoc, type NonEmptyArray } from 'ramda'
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

export const CreateOfferManager: FunctionComponent<Props> = ({
  sender,
  receiver,
  receiverNfts,
  receiverNftsSelection,
  senderNfts
}) => {
  const router = useRouter()
  const { address, chain } = useAccount()
  const senderWithWallet = assoc('wallet', { address, chain }, sender) as UserWithWallet
  return (
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
