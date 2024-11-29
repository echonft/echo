// noinspection JSUnusedGlobalSymbols

import { swapMock } from '@echo/model/mocks/swap-mock'
import { RecentSwaps as Component } from '@echo/ui/pages/home/swap/recent-swaps'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Recent Swaps',
  component: Component,
  parameters: {
    controls: {
      exclude: ['swaps']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    swaps: [
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock)
    ]
  }
}
