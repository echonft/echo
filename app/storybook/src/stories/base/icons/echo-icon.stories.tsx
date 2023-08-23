import { EchoIcon as Component, echoIconColors, iconSizes } from '@echo/ui'
import { ColorYellow, SizeSM } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
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
}

export default metadata

type Story = StoryObj<typeof Component>

export const EchoIcon: Story = {
  args: {
    size: SizeSM,
    color: ColorYellow
  }
}
