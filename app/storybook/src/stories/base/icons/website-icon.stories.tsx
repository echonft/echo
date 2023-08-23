import { iconSizes, WebsiteIcon as Component } from '@echo/ui'
import { SizeMD } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Website Icon',
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

export const WebsiteIcon: Story = {
  args: {
    size: SizeMD
  }
}
