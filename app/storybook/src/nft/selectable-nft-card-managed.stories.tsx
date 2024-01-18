// noinspection JSUnusedGlobalSymbols

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
import { useMemo, useState } from 'react'

const DEFAULT_DISABLED = false
const DEFAULT_HIDE_OWNER = false
interface Args extends Omit<SelectableNftCardProps, 'nft' | 'onToggleSelection'> {
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
    hideOwner: {
      defaultValue: DEFAULT_HIDE_OWNER,
      control: 'boolean'
    },
    onAction: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Managed: Story = {
  args: {
    disabled: DEFAULT_DISABLED,
    hideOwner: DEFAULT_HIDE_OWNER
  },
  render: ({ onAction, hideOwner, disabled }) => {
    const [selected, setSelected] = useState(false)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nft: SelectableNft = useMemo(
      pipe(
        getNftMock,
        assoc('action', NFT_ACTION_OFFER),
        assoc('actionDisabled', selected),
        assoc('selected', selected),
        assoc('disabled', disabled)
      ),
      [selected, disabled]
    )
    return (
      <SelectableNftCard
        nft={nft}
        hideOwner={hideOwner}
        onAction={onAction}
        onToggleSelection={(_nft, selected) => {
          setSelected(selected)
        }}
      />
    )
  }
}
