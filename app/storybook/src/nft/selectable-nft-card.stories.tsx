// noinspection JSUnusedGlobalSymbols

import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

interface Args extends Pick<SelectableNftCardProps, 'onSelect' | 'onAction'> {
  action: boolean
  hideOwner: boolean
  selected: boolean
}

type ComponentType = FunctionComponent<Args>
const metadata: Meta<ComponentType> = {
  title: 'NFT/Selectable Card',
  args: {
    action: true,
    hideOwner: false,
    selected: false
  },
  argTypes: {
    action: {
      control: 'boolean'
    },
    hideOwner: {
      control: 'boolean'
    },
    selected: {
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
  render: ({ action, hideOwner, selected, onSelect, onAction }) => {
    return (
      <SelectableNftCard
        nft={nftMockSpiral1}
        options={{ owner: { hide: hideOwner } }}
        action={action ? NftAction.Offer : undefined}
        selected={selected}
        onSelect={onSelect}
        onAction={onAction}
      />
    )
  }
}
