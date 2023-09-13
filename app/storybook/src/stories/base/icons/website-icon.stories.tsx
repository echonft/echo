import { WebsiteIcon as Component } from '@echo/ui/components/base/icons/website-icon'
import { iconSizes } from '@echo/ui/constants/icon-size'
import { SizeMD } from '@echo/ui/constants/size'
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
