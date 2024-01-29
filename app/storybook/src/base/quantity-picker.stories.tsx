// noinspection JSUnusedGlobalSymbols

import { QuantityPicker as Component } from '@echo/ui/components/base/quantity-picker'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Quantity Picker',
  component: Component,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      defaultValue: false,
      control: 'boolean'
    },
    onQtyChange: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['initialQty', 'min', 'max']
    }
  }
}
export default metadata
export const QuantityPicker: StoryObj<typeof Component> = {}
