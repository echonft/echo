import { TwitterIcon as Component } from '@echo/ui/components/base/icons/twitter-icon'
import { iconSizes } from '@echo/ui/constants/icon-size'
import { SizeMD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Twitter Icon',
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

export const TwitterIcon: Story = {
  args: {
    size: SizeMD
  }
}
