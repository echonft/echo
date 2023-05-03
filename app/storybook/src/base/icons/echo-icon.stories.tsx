import { ColorYellow, EchoIcon as Component, echoIconColors, iconSizes, SizeSM } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Base/Icons/Echo Icon',
  component: Component,
  argTypes: {
    size: {
      options: iconSizes,
      control: { type: 'radio' }
    },
    color: {
      options: echoIconColors,
      control: { type: 'radio' }
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const EchoIcon: Story = {
  args: {
    size: SizeSM,
    color: ColorYellow
  }
}
