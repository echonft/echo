// noinspection JSUnusedGlobalSymbols

import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
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
      control: { type: 'boolean' }
    }
  }
}

export default metadata

export const Row: StoryObj<ComonentType> = {
  render: ({ approved }) => {
    const { approved: contractApproved, setApproved } = contractApprovalStore()
    useEffect(() => {
      setApproved(approved)
    }, [approved])

    return (
      <Component
        collectionName={nftMockSpiral1.collection.name}
        contract={nftMockSpiral1.collection.contract}
        address={nftMockSpiral1.owner.wallet.address}
        approved={contractApproved}
      />
    )
  }
}
