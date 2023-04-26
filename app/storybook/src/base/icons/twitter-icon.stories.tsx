import { iconSizes, SizeMD, TwitterIcon as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Base/Icons/Twitter Icon',
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

export const TwitterIcon: Story = {
  args: {
    size: SizeMD
  }
}
