import type { Collection } from '@echo/model/types/collection'
import { HomeHero as Component } from '@echo/ui/components/home/hero/home-hero'
import { getCollectionById } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Home/Hero',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collection']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collection = pipe(getCollectionById, assoc('swapsCount', 2))('Rc8pLQXxgyQGIRL0fr13') as Collection

export const Default: Story = {
  args: {
    collection
  }
}
