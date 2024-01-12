import type { GetOfferArgs } from '@echo/api/services/fetcher/get-offer'
import type { GetOfferSignatureArgs } from '@echo/api/services/fetcher/get-offer-signature'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetailsSwapExecuteModal as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-execute-modal'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ExecuteSwapArgs } from '@echo/web3/helpers/wagmi/fetcher/execute-swap'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function getOffer(_args: GetOfferArgs): Promise<OfferResponse> {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_COMPLETED, offer) }), 1200)
}
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
      getOffer,
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
      getOffer,
      getOfferSignature,
      executeSwap
    }
  }
}
