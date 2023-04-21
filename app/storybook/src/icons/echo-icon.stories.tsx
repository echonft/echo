import { EchoIcon as Component, EchoIconColor, IconSize } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Icons/Echo Icon',
  component: Component,
  argTypes: {
    size: {
      options: Object.values(IconSize),
      control: { type: 'radio' }
    },
    color: {
      options: Object.values(EchoIconColor),
      control: { type: 'radio' }
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const EchoIcon: Story = {
  args: {
    size: IconSize.CARD,
    color: EchoIconColor.Yellow
  }
}
