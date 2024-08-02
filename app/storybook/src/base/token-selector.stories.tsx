// noinspection JSUnusedGlobalSymbols

import { TokenSelector as Component } from '@echo/ui/components/base/token-selector/token-selector'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Token Selector',
  component: Component
  // argTypes: {
  //   onQtyChange: {
  //     table: {
  //       disable: true
  //     }
  //   }
  // },
  // parameters: {
  //   controls: {
  //     exclude: ['initialQty', 'min', 'max']
  //   }
  // }
}
export default metadata
export const TokenSelector: StoryObj<typeof Component> = {}
