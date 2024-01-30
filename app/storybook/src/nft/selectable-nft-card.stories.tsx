// noinspection JSUnusedGlobalSymbols

import type { Nft } from '@echo/model/types/nft'
import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import type { SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { SelectableNftCard } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

interface Args extends Omit<SelectableNftCardProps, 'nft'> {
  selectionDisabled: boolean
  selected: boolean
  disabled: boolean
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
    onToggleSelection: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ selectionDisabled, selected, disabled, hideOwner, onToggleSelection, onAction }) => {
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
      <SelectableNftCard nft={nft} hideOwner={hideOwner} onToggleSelection={onToggleSelection} onAction={onAction} />
    )
  }
}
