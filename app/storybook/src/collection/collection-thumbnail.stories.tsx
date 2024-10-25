// noinspection JSUnusedGlobalSymbols

import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { CollectionThumbnail as Component } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Thumbnail',
  component: Component,
  args: {
    collection: collectionMockSpiral
  },
  parameters: {
    controls: {
      exclude: ['collection']
    }
  }
}

export default metadata

export const Thumbnail: StoryObj<typeof Component> = {}
