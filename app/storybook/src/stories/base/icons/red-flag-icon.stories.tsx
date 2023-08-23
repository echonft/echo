import { iconSizes, RedFlagIcon as Component } from '@echo/ui'
import { SizeSM } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Red Flag Icon',
  component: Component,
  argTypes: {
    size: {
      options: iconSizes,
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const RedFlagIcon: Story = {
  args: {
    size: SizeSM
  }
}
