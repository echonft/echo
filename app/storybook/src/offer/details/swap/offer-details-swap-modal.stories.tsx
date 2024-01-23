// noinspection JSUnusedGlobalSymbols

import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetailsSwapModal as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import type { ExecuteSwapArgs } from '@echo/web3/types/execute-swap-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function getOfferSignature(_args: GetOfferSignatureArgs): Promise<OfferSignatureResponse> {
  return delayPromise(Promise.resolve({ signature: '0xwhatever' }), 1200)
}
function executeSwap(_args: ExecuteSwapArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function chain() {
  return 1
}
function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  return delayPromise(Promise.resolve(false), 1200)
}
function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Swap',
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
      exclude: ['offer', 'open', 'token', 'fetcher', 'provider']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Swap: Story = {
  args: {
    offer,
    open: true,
    fetcher: {
      getOfferSignature,
      executeSwap,
      approveErc721Contract,
      getErc721ContractApproval
    },
    provider: {
      chain
    }
  }
}
