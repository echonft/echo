import { DiscordIcon as Component, iconSizes, SizeMD } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Icons/Discord Icon',
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

export const DiscordIcon: Story = {
  args: {
    size: SizeMD
  }
}
