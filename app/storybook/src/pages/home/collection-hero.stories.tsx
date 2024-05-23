// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
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

export const Default: StoryObj<typeof Component> = {
  args: {
    collection: pipe<[string], Collection, Collection>(
      getCollectionMockById,
      assoc('swapsCount', 2)
    )(COLLECTION_MOCK_PX_ID)
  }
}
