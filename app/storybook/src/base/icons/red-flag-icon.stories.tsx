import { iconSizes, RedFlagIcon as Component, SizeSM } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Base/Icons/Red Flag Icon',
  component: Component,
  argTypes: {
    size: {
      options: iconSizes,
      control: { type: 'radio' }
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const RedFlagIcon: Story = {
  args: {
    size: SizeSM
  }
}
