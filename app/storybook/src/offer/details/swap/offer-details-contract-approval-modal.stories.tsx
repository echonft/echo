import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetailsContractApprovalModal as Component } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  return delayPromise(Promise.resolve(false), 1200)
}
function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
const t = getTranslator()
const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Swap/Contract Approval Check',
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
  component: Component,
  parameters: {
    controls: {
      exclude: ['items', 'open', 'title', 'subtitle', 'fetcher']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const ContractApprovalCheck: Story = {
  args: {
    items: offer.receiverItems,
    open: true,
    title: t('offer.details.swapModal.title'),
    subtitle: t('offer.details.swapModal.approval.subtitle'),
    fetcher: {
      approveErc721Contract,
      getErc721ContractApproval
    }
  }
}
