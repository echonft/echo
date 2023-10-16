import type { Collection } from '@echo/model/types/collection'
import { TopCollections as Component } from '@echo/ui/components/home/collection/top/top-collections'
import { getAllCollections } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Home/Top Collections',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collections = map(pipe(assoc('swapsCount', 2)), getAllCollections()) as Collection[]

export const Default: Story = {
  args: {
    collections: concat(collections, collections)
  }
}
