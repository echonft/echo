// noinspection JSUnusedGlobalSymbols

import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { executeSwap } from '@echo/storybook/mocks/execute-swap'
import { getOfferSignature } from '@echo/storybook/mocks/get-offer-signature'
import { OfferDetailsSwapExecuteModal as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-execute-modal'
import type { Meta, StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{ signature: boolean; onClose?: VoidFunction; onSuccess?: VoidFunction }>
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details/Swap/Execute',
  args: {
    signature: false
  },
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
    },
    signature: {
      defaultValue: false,
      control: 'boolean'
    }
  }
}

export default metadata

export const Execute: StoryObj<ComponentType> = {
  render: ({ signature, onClose, onSuccess }) => (
    <Component
      offer={getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')}
      chainId={1}
      signature={signature ? '0xwhatever' : undefined}
      fetcher={{
        getOfferSignature,
        executeSwap
      }}
      open={true}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  )
}
