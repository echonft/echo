// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { HomeHero as Component } from '@echo/ui/pages/home/hero/home-hero'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Hero',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collection']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collection = pipe(getCollectionMockById, assoc('swapsCount', 2))('Rc8pLQXxgyQGIRL0fr13') as Collection

export const Default: Story = {
  args: {
    collection
  }
}
