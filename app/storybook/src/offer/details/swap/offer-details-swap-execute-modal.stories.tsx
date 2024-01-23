// noinspection JSUnusedGlobalSymbols

import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetailsSwapExecuteModal as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-execute-modal'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ExecuteSwapArgs } from '@echo/web3/types/execute-swap-args'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function getOfferSignature(_args: GetOfferSignatureArgs): Promise<OfferSignatureResponse> {
  return delayPromise(Promise.resolve({ signature: '0xwhatever' }), 1200)
}
function executeSwap(_args: ExecuteSwapArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Swap/Execute',
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
      exclude: ['offer', 'open', 'chainId', 'token', 'signature', 'fetcher']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const WithSignature: Story = {
  args: {
    offer,
    chainId: 1,
    open: true,
    signature: '0xwhatever',
    fetcher: {
      getOfferSignature,
      executeSwap
    }
  }
}

export const WithoutSignature: Story = {
  args: {
    offer,
    chainId: 1,
    open: true,
    signature: undefined,
    fetcher: {
      getOfferSignature,
      executeSwap
    }
  }
}
