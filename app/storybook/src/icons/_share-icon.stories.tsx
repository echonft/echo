import { IconSize, ShareIcon as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Icons/Share Icon',
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

export const ShareIcon: Story = {
  args: {
    size: IconSize.CARD
  }
}
