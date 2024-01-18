// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import type { SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { SelectableNftCard } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

const DEFAULT_SELECTION_DISABLED = false
const DEFAULT_SELECTED = false
const DEFAULT_DISABLED = false
const DEFAULT_HIDE_OWNER = false
interface Args extends Omit<SelectableNftCardProps, 'nft'> {
  selectionDisabled: boolean
  selected: boolean
  disabled: boolean
}
type ComponentType = FunctionComponent<Args>
const metadata: Meta<ComponentType> = {
  title: 'NFT/Selectable Card',
  argTypes: {
    disabled: {
      defaultValue: DEFAULT_DISABLED,
      control: 'boolean'
    },
    selectionDisabled: {
      defaultValue: DEFAULT_SELECTION_DISABLED,
      control: 'boolean',
      if: { arg: 'disabled', truthy: false }
    },
    hideOwner: {
      defaultValue: DEFAULT_HIDE_OWNER,
      control: 'boolean'
    },
    selected: { control: 'boolean', defaultValue: DEFAULT_SELECTED, if: { arg: 'selectionDisabled', truthy: false } },
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

type Story = StoryObj<ComponentType>

export const Default: Story = {
  args: {
    selectionDisabled: DEFAULT_SELECTION_DISABLED,
    hideOwner: DEFAULT_HIDE_OWNER,
    selected: DEFAULT_SELECTED,
    disabled: DEFAULT_DISABLED
  },
  render: ({ selectionDisabled, selected, disabled, hideOwner, onToggleSelection, onAction }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nft: SelectableNft = useMemo(
      pipe(
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
