import { OpenSeaIcon as Component } from '@echo/ui/components/base/icons/open-sea-icon'
import { iconSizes } from '@echo/ui/constants/icon-size'
import { SizeMD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

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
