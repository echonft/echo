import type { Collection } from '@echo/model/types/collection'
import { HomeCollections as Component } from '@echo/ui/components/home/collection/home-collections'
import { getAllCollections } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Home/Collections',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collectionDetails = map(pipe(assoc('swapsCount', 2)), getAllCollections()) as Collection[]
const collections = pipe(
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails)
)(collectionDetails)

export const Default: Story = {
  args: {
    collections
  }
}
