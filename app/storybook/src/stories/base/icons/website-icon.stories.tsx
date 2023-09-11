import { WebsiteIcon as Component } from '@echo/ui/src/components/base/icons/website-icon'
import { iconSizes } from '@echo/ui/src/constants/icon-size'
import { SizeMD } from '@echo/ui/src/constants/size'
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
