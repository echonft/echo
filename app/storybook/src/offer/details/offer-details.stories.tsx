// noinspection JSUnusedGlobalSymbols

import type { AcceptOfferArgs } from '@echo/api/services/fetcher/accept-offer'
import type { CancelOfferArgs } from '@echo/api/services/fetcher/cancel-offer'
import type { GetOfferArgs } from '@echo/api/services/fetcher/get-offer'
import type { GetOfferSignatureArgs } from '@echo/api/services/fetcher/get-offer-signature'
import type { RejectOfferArgs } from '@echo/api/services/fetcher/reject-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED,
  OFFER_STATES
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import type { ExecuteSwapArgs } from '@echo/web3/helpers/wagmi/fetcher/execute-swap'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import type { SignOfferArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-offer'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc, ifElse, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<
  Record<'state', OfferState> & Record<'expired', boolean> & Record<'isCreator', boolean>
>
const DEFAULT_STATE: OfferState = OFFER_STATE_OPEN
const DEFAULT_IS_CREATOR = true
const DEFAULT_EXPIRED = false
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function acceptOffer(_args: AcceptOfferArgs): Promise<OfferResponse> {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_ACCEPTED, offer) }), 1200)
}
function signOffer(_args: SignOfferArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  return delayPromise(Promise.resolve(false), 1200)
}
function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function rejectOffer(_args: RejectOfferArgs) {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_REJECTED, offer) }), 800)
}
function cancelOffer(_args: CancelOfferArgs) {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_CANCELLED, offer) }), 800)
}
function getOffer(_args: GetOfferArgs): Promise<OfferResponse> {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_COMPLETED, offer) }), 1200)
}
function getOfferSignature(_args: GetOfferSignatureArgs): Promise<OfferSignatureResponse> {
  return delayPromise(Promise.resolve({ signature: '0xwhatever' }), 1200)
}
function executeSwap(_args: ExecuteSwapArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function chain() {
  return 1
}
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details',
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: OFFER_STATES,
      control: { type: 'radio' }
    },
    expired: {
      defaultValue: DEFAULT_EXPIRED,
      control: 'boolean'
    },
    isCreator: {
      defaultValue: DEFAULT_IS_CREATOR,
      control: 'boolean'
    }
  },
  parameters: {
    controls: {
      exclude: ['offer', 'token', 'fetcher', 'provider']
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Default: Story = {
  render: ({ state, expired, isCreator }) => {
    const renderedOffer = pipe<[Offer], Offer, Offer, Offer>(
      assoc('state', state),
      assoc('expired', expired),
      ifElse<[Offer], Offer, Offer>(
        prop('expired'),
        assoc('expiresAt', EXPIRED_DATE),
        assoc('expiresAt', NOT_EXPIRED_DATE)
      )
    )(offer)
    return (
      <Component
        offer={renderedOffer}
        isCreator={isCreator}
        fetcher={{
          approveErc721Contract,
          getErc721ContractApproval,
          acceptOffer,
          cancelOffer,
          executeSwap,
          getOffer,
          getOfferSignature,
          rejectOffer,
          signOffer
        }}
        provider={{
          chain
        }}
      />
    )
  },
  args: {
    state: DEFAULT_STATE,
    expired: DEFAULT_EXPIRED,
    isCreator: DEFAULT_IS_CREATOR
  }
}
