// noinspection JSUnusedGlobalSymbols

import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { CreateListingModal as Component } from '@echo/ui/components/listing/create/create-listing-modal'
import { type Meta, type StoryObj } from '@storybook/react'
import { head } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Creation/Creating',
  component: Component,
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
  args: {
    open: true
  },
  parameters: {
    controls: {
      exclude: ['target', 'items', 'open']
    }
  }
}

export default metadata

const { targets, items } = getListingMock()
const target = head(targets)
const collections = getAllCollectionMocks()

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    target,
    items,
    collections
  }
}

export const Confirming: Story = {
  args: {
    target,
    items,
    collections,
    isMutating: true
  }
}

export const NoItems: Story = {
  args: {
    target,
    items: [],
    collections
  }
}
