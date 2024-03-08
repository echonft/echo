// noinspection JSUnusedGlobalSymbols

import type { Nft } from '@echo/model/types/nft'
import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

interface Args extends Pick<SelectableNftCardProps, 'onSelect' | 'onAction'> {
  selectionDisabled: boolean
  selected: boolean
  disabled: boolean
  hideOwner: boolean
}
type ComponentType = FunctionComponent<Args>
const metadata: Meta<ComponentType> = {
  title: 'NFT/Selectable Card',
  args: {
    selectionDisabled: false,
    hideOwner: false,
    selected: false,
    disabled: false
  },
  argTypes: {
    disabled: {
      defaultValue: false,
      control: 'boolean'
    },
    selectionDisabled: {
      defaultValue: false,
      control: 'boolean',
      if: { arg: 'disabled', truthy: false }
    },
    hideOwner: {
      defaultValue: false,
      control: 'boolean'
    },
    selected: { control: 'boolean', defaultValue: false, if: { arg: 'selectionDisabled', truthy: false } },
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
  render: ({ selectionDisabled, selected, disabled, hideOwner, onSelect, onAction }) => {
    const nft = useMemo(
      pipe<[], Nft, SelectableNft, SelectableNft, SelectableNft, SelectableNft, SelectableNft>(
        getNftMock,
        assoc('action', NFT_ACTION_OFFER),
        assoc('actionDisabled', selected),
        assoc('selectionDisabled', selectionDisabled),
        assoc('selected', selected),
        assoc('disabled', disabled)
      ),
      [selectionDisabled, selected, disabled]
    )
    return (
      <SelectableNftCard nft={nft} options={{ owner: { hide: hideOwner } }} onSelect={onSelect} onAction={onAction} />
    )
  }
}
