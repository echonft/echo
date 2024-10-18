// noinspection JSUnusedGlobalSymbols

import { EthereumIcon as Component } from '@echo/ui/components/base/icons/ethereum-icon'
import { Size } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Base/Icons/Ethereum',
  component: Component,
  args: {
    size: Size.MD
  },
  argTypes: {
    size: {
      options: values(Size),
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Ethereum: StoryObj<typeof Component> = {}
