import { iconSizes, OpenSeaIcon as Component, SizeMD } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Base/Icons/Opensea Icon',
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

export const OpenseaIcon: Story = {
  args: {
    size: SizeMD
  }
}
