import { DiscordIcon as Component, IconSize } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Icons/Discord Icon',
  component: Component,
  argTypes: {
    size: {
      options: Object.values(IconSize),
      control: { type: 'radio' }
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const DiscordIcon: Story = {
  args: {
    size: IconSize.CARD
  }
}
