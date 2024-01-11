import type { CreateListingArgs } from '@echo/api/services/fetcher/create-listing'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { NewListingManager as Component } from '@echo/ui/components/listing/new/new-listing-manager'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import { head } from 'ramda'

const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
function createListing(_args: CreateListingArgs) {
  return delayPromise(Promise.resolve({ listing }), 1200)
}
const provider = {
  collections: () => delayPromise(Promise.resolve(getAllCollectionMocks()))
}
const { targets, items } = listing
const target = head(targets)
const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Bottom Slider',
  component: Component,
  argTypes: {
    onDismiss: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['fetcher', 'collectionProvider', 'open', 'initialTargets', 'initialItems', 'user']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Empty: Story = {
  args: {
    fetcher: {
      createListing
    },
    provider,
    open: true,
    user: undefined
  }
}

export const WithTarget: Story = {
  args: {
    fetcher: {
      createListing
    },
    provider,
    open: true,
    initialTarget: target,
    user: undefined
  }
}

export const WithItems: Story = {
  args: {
    fetcher: {
      createListing
    },
    provider,
    open: true,
    initialItems: items,
    user: undefined
  }
}

export const WithTargetAndItems: Story = {
  args: {
    fetcher: {
      createListing
    },
    provider,
    open: true,
    initialTarget: target,
    initialItems: items,
    user: undefined
  }
}
