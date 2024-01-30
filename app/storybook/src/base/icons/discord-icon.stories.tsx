// noinspection JSUnusedGlobalSymbols

import { DiscordIcon as Component } from '@echo/ui/components/base/icons/discord-icon'
import { ICON_SIZES } from '@echo/ui/constants/icon-size'
import { SIZE_MD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Discord Icon',
  component: Component,
  args: {
    size: SIZE_MD
  },
  argTypes: {
    size: {
      options: ICON_SIZES,
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const DiscordIcon: StoryObj<typeof Component> = {}
