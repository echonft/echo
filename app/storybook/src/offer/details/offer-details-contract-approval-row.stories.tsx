// noinspection JSUnusedGlobalSymbols

import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc-721-contract-approval'
import { OfferDetailsContractApprovalRow as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-row'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { Meta, StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComonentType = FunctionComponent<{ state: 'Approved' | 'Loading' | 'Not Approved' }>
const metadata: Meta<ComonentType> = {
  title: 'Offer/Details/Contract Approval/Row',
  args: {
    state: 'Approved'
  },
  argTypes: {
    state: {
      defaultValue: 'Approved',
      options: ['Approved', 'Loading', 'Not Approved'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Row: StoryObj<ComonentType> = {
  render: ({ state }) => {
    const nft = getNftMockById('8hHFadIrrooORfTOLkBg')
    function getApproved() {
      switch (state) {
        case 'Approved':
          return true
        case 'Loading':
          return undefined
        case 'Not Approved':
          return false
      }
    }
    return (
      <Component
        collectionName={nft.collection.name}
        contract={nft.collection.contract}
        owner={nft.owner.wallet.address}
        fetcher={{
          getErc721ContractApproval:
            state === 'Loading'
              ? function (_args: GetErc721ContractApprovalArgs): Promise<boolean> {
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  return new Promise(() => {})
                }
              : getErc721ContractApproval(true)
        }}
        approved={getApproved()}
      />
    )
  }
}
