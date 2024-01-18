// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionBanner as Component } from '@echo/ui/components/collection/details/collection-banner'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Banner',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  args: {
    bannerUrl: getCollectionMockById('Rc8pLQXxgyQGIRL0fr13').bannerUrl
  }
}

export const Default: Story = {
  args: {
    bannerUrl: undefined
  }
}
