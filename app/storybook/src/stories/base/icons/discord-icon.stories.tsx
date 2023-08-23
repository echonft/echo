import { DiscordIcon as Component, iconSizes } from '@echo/ui'
import { SizeMD } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Discord Icon',
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

export const DiscordIcon: Story = {
  args: {
    size: SizeMD
  }
}
