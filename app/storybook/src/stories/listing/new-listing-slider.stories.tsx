import { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { NewListingSliderManager as Component } from '@echo/ui/components/listing/new/new-listing-slider-manager'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { getAllCollections } from '@mocks/model/collection'
import { getListingById } from '@mocks/model/listing'
import { Meta, StoryObj } from '@storybook/react'
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
const listing = getListingById('jUzMtPGKM62mMhEcmbN4')
const createListingFetcher = (_parameters: CreateListingRequest, _token: string | undefined) =>
  delayPromise(
    Promise.resolve({
      listing
    })
  )
const collectionProvider = {
  get: () => delayPromise(Promise.resolve(getAllCollections()))
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
