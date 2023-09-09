import { iconSizes, OpenSeaIcon as Component, SizeMD } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Opensea Icon',
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

export const OpenseaIcon: Story = {
  args: {
    size: SizeMD
  }
}
