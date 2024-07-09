// noinspection JSUnusedGlobalSymbols

import { getCollectionMock } from '@echo/model/mocks/collection/get-collection-mock'
import { SelectableCollectionThumbnail as Component } from '@echo/ui/components/collection/thumbnail/selectable-collection-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Thumbnail/Selectable',
  component: Component,
  args: {
    collection: getCollectionMock()
  },
  argTypes: {
    onRemove: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['collection']
    }
  }
}

export default metadata

export const Selectable: StoryObj<typeof Component> = {}
