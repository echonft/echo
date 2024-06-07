// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

interface Args extends Pick<SelectableNftCardProps, 'onSelect' | 'onAction'> {
  action: boolean
  hideOwner: boolean
}

type ComponentType = FunctionComponent<Args>
const metadata: Meta<ComponentType> = {
  title: 'NFT/Selectable Card',
  args: {
    action: true,
    hideOwner: false
  },
  argTypes: {
    action: {
      control: 'boolean'
    },
    hideOwner: {
      control: 'boolean'
    },
    onAction: {
      table: {
        disable: true
      }
    },
    onSelect: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

export const SelectableCard: StoryObj<ComponentType> = {
  render: ({ action, hideOwner, onSelect, onAction }) => {
    return (
      <SelectableNftCard
        nft={getNftMock()}
        options={{ owner: { hide: hideOwner } }}
        action={action ? NFT_ACTION_OFFER : undefined}
        onSelect={onSelect}
        onAction={onAction}
      />
    )
  }
}
