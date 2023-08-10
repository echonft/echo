import { iconSizes, RedFlagIcon as Component, SizeSM } from '@echo/ui'
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
