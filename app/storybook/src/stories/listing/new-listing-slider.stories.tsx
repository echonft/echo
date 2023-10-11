import { NewListingSliderManager as Component } from '@echo/ui/components/listing/new/new-listing-slider-manager'
import { getAllCollections } from '@mocks/model/collection'
import { getListingById } from '@mocks/model/listing'
import { Meta, StoryObj } from '@storybook/react'
import { head } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Bottom Slider',
  component: Component,
  argTypes: {
    onDismiss: {
      control: false,
      action: 'dismissed'
    }
  },
  parameters: {
    controls: {
      exclude: ['collectionProvider', 'show', 'onDismiss', 'initialTargets', 'initialItems']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collectionProvider = {
  get: () => Promise.resolve(getAllCollections())
}
const { targets, items } = getListingById('jUzMtPGKM62mMhEcmbN4')
const target = head(targets)

export const Empty: Story = {
  args: {
    collectionProvider,
    show: true
  }
}

export const Loading: Story = {
  args: {
    collectionProvider: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      get: () => new Promise(() => {})
    },
    show: true
  }
}

export const WithTarget: Story = {
  args: {
    collectionProvider,
    show: true,
    initialTarget: target
  }
}

export const WithItems: Story = {
  args: {
    collectionProvider,
    show: true,
    initialItems: items
  }
}

export const WithTargetAndItems: Story = {
  args: {
    collectionProvider,
    show: true,
    initialTarget: target,
    initialItems: items
  }
}
