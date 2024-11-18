// noinspection JSUnusedGlobalSymbols

import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { OfferDetailsContractApprovalModal as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Contract Approval',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onSuccess: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['items', 'open', 'title', 'subtitle']
    }
  }
}

export default metadata

export const Modal: StoryObj<typeof Component> = {
  render: ({ onSuccess, onClose }) => {
    const items = pipe(
      offerReceiverNftItems,
      nonEmptyMap(pipe(nftItemToNft(userMockJohnny), assoc('attributes', [])))
    )(offerMockToJohnnycage)
    return (
      <Component
        items={items}
        open={true}
        title={'Execute Swap'}
        subtitle={'To create the offer, you first need to approve the Echo contract to escrow your NFTs'}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    )
  }
}
