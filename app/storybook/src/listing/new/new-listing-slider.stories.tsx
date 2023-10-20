import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { NewListingSliderManager as Component } from '@echo/ui/components/listing/new/new-listing-slider-manager'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import { head } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Bottom Slider',
  component: Component,
  argTypes: {
    onDismiss: {
      control: false,
      action: 'dismissed'
    }
  },
  parameters: {
    controls: {
      exclude: [
        'createListingFetcher',
        'collectionProvider',
        'show',
        'onDismiss',
        'initialTargets',
        'initialItems',
        'user'
      ]
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
const createListingFetcher = (_parameters: CreateListingRequest, _token: string | undefined) =>
  delayPromise(
    Promise.resolve({
      listing
    })
  )
const collectionProvider = {
  get: () => delayPromise(Promise.resolve(getAllCollectionMocks()))
}
const { targets, items } = listing
const target = head(targets)

export const Empty: Story = {
  args: {
    createListingFetcher,
    collectionProvider,
    show: true,
    user: undefined
  }
}

export const WithTarget: Story = {
  args: {
    createListingFetcher,
    collectionProvider,
    show: true,
    initialTarget: target,
    user: undefined
  }
}

export const WithItems: Story = {
  args: {
    createListingFetcher,
    collectionProvider,
    show: true,
    initialItems: items,
    user: undefined
  }
}

export const WithTargetAndItems: Story = {
  args: {
    createListingFetcher,
    collectionProvider,
    show: true,
    initialTarget: target,
    initialItems: items,
    user: undefined
  }
}
