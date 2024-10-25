// noinspection JSUnusedGlobalSymbols

import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { HomeHero as Component } from '@echo/ui/pages/home/hero/home-hero'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

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
    collection: assoc('swapsCount', 2, collectionMockPx)
  }
}
