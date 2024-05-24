// noinspection JSUnusedGlobalSymbols

import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'
import { contractApprovalStore } from '@echo/storybook/mocks/stores/contract-approval-store'
import { OfferDetailsContractApprovalRow as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-row'
import type { Meta, StoryObj } from '@storybook/react'
import { type FunctionComponent, useEffect } from 'react'

type ComonentType = FunctionComponent<{ approved: boolean }>
const metadata: Meta<ComonentType> = {
  title: 'Offer/Details/Modal/Contract Approval/Row',
  args: {
    approved: false
  },
  argTypes: {
    approved: {
      defaultValue: false,
      control: { type: 'boolean' }
    }
  }
}

export default metadata

export const Row: StoryObj<ComonentType> = {
  render: ({ approved }) => {
    const nft = getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID)
    const { approved: contractApproved, setApproved } = contractApprovalStore()
    useEffect(() => {
      setApproved(approved)
    }, [approved])

    return (
      <Component
        collectionName={nft.collection.name}
        contract={nft.collection.contract}
        owner={nft.owner.wallet.address}
        approved={contractApproved}
      />
    )
  }
}
