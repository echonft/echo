// noinspection JSUnusedGlobalSymbols

import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { CreateListingModal as Component } from '@echo/ui/components/listing/create/create-listing-modal'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type Meta, type StoryObj } from '@storybook/react'
import { head, pipe, prop } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Creation/Creating',
  component: Component,
  args: {
    open: true,
    target: pipe<[], Listing, ListingTarget[], ListingTarget>(
      getListingMock,
      nonNullableReturn(prop('targets')),
      head
    )(),
    items: pipe<[], Listing, ListingItem[]>(getListingMock, nonNullableReturn(prop('items')))(),
    collections: getAllCollectionMocks()
  },
  argTypes: {
    onClear: {
      table: {
        disable: true
      }
    },
    onCollectionSelectionChange: {
      table: {
        disable: true
      }
    },
    onTargetAmountChange: {
      table: {
        disable: true
      }
    },
    onContinue: {
      table: {
        disable: true
      }
    },
    onClose: {
      table: {
        disable: true
      }
    },
    onConfirm: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['collections', 'isMutating', 'items', 'open', 'target']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {}

export const Confirming: StoryObj<typeof Component> = {
  args: {
    isMutating: true
  }
}

export const NoItems: StoryObj<typeof Component> = {
  args: {
    items: []
  }
}
