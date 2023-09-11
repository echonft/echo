import { EchoIcon as Component } from '@echo/ui/src/components/base/icons/echo-icon'
import { ColorYellow } from '@echo/ui/src/constants/color'
import { echoIconColors } from '@echo/ui/src/constants/echo-icon-color'
import { iconSizes } from '@echo/ui/src/constants/icon-size'
import { SizeSM } from '@echo/ui/src/constants/size'
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
