import type { OfferItem } from '@echo/model/types/offer-item'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getUserProfileMockByUsername } from '@echo/model-mocks/user/user-profile-mock'
import { CreateOffer as Component, CreateOffer } from '@echo/ui/components/offer/create/create-offer'
import { SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import type { Meta, StoryObj } from '@storybook/react'
import { always, applySpec, assoc, both, filter, identity, map, pathEq, pipe, toLower } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Creation/Create',
  component: Component,
  argTypes: {
    onCancel: {
      table: {
        disable: true
      }
    },
    onComplete: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['receiver', 'receiverItems', 'senderNfts']
    }
  }
}

export default metadata

export const Create: StoryObj<typeof Component> = {
  render: ({ onCancel, onComplete }) => {
    const receiver = pipe(
      getUserProfileMockByUsername,
      assoc('wallets', [{ chainId: SEPOLIA_CHAIN_ID, address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D') }])
    )('crewnft_')
    // const sender = getAuthUserMockByUsername('johnnycagewins')
    const nfts = getAllNftMocks()
    const receiverItems = pipe(
      filter(both(pathEq('crewnft_', ['owner', 'username']), pathEq('Rc8pLQXxgyQGIRL0fr13', ['collection', 'id']))),
      map(
        applySpec<OfferItem>({
          amount: always(1),
          nft: identity
        })
      )
    )(nfts)
    const senderNfts = pipe(
      filter(pathEq('johnnycagewins', ['owner', 'username'])),
      map(assoc('actionDisabled', true))
    )(nfts)
    return (
      <CreateOffer
        receiver={receiver}
        receiverItems={receiverItems}
        senderNfts={senderNfts}
        onCancel={onCancel}
        onComplete={onComplete}
      />
    )
  }
}
