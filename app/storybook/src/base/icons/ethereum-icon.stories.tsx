// noinspection JSUnusedGlobalSymbols

import { EthereumIcon as Component } from '@echo/ui/components/base/icons/ethereum-icon'
import { ICON_SIZES } from '@echo/ui/constants/icon-size'
import { SIZE_MD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Ethereum',
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

export const Ethereum: StoryObj<typeof Component> = {}
