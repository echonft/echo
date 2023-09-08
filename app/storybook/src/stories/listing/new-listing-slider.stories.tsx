import { getListingById } from '../../mocks/model/listing'
import { getAllCollections } from '../../mocks/model/nft-collection'
import { NewListingSliderManager as Component } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

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

export const Empty: Story = {
  args: {
    collectionProvider,
    show: true
  }
}

export const Loading: Story = {
  args: {
    collectionProvider: {
      get: () => new Promise(() => {})
    },
    show: true
  }
}

export const WithTargets: Story = {
  args: {
    collectionProvider,
    show: true,
    initialTargets: targets
  }
}

export const WithItems: Story = {
  args: {
    collectionProvider,
    show: true,
    initialItems: items
  }
}

export const WithTargetsAndItems: Story = {
  args: {
    collectionProvider,
    show: true,
    initialTargets: targets,
    initialItems: items
  }
}
