import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { OfferDetailsContractApprovalRow as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-row'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import type { Meta, StoryObj } from '@storybook/react'

const nft = getNftMockById('8hHFadIrrooORfTOLkBg')
const collectionName = 'Sun Flyers'
const contract = nft.collection.contract
const owner = nft.owner.wallet.address
function fetch(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return new Promise(() => {})
}
const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Contract Approval/Row',
  component: Component,
  argTypes: {
    onSuccess: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['approved', 'contract', 'owner', 'fetcher']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Loading: Story = {
  args: {
    collectionName,
    contract,
    owner,
    fetcher: {
      getErc721ContractApproval: fetch
    },
    approved: undefined
  }
}

export const Approved: Story = {
  args: {
    collectionName,
    contract,
    owner,
    fetcher: {
      getErc721ContractApproval: fetch
    },
    approved: true
  }
}

export const NotApproved: Story = {
  args: {
    collectionName,
    contract,
    owner,
    fetcher: {
      getErc721ContractApproval: fetch
    },
    approved: false
  }
}
