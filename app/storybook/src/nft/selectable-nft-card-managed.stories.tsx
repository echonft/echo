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
import { useMemo, useState } from 'react'

interface Args extends Pick<SelectableNftCardProps, 'onToggleSelection' | 'onAction'> {
  disabled: boolean
  hideOwner: boolean
}
type ComponentType = FunctionComponent<Args>
const metadata: Meta<ComponentType> = {
  title: 'NFT/Selectable Card',
  args: {
    disabled: false,
    hideOwner: false
  },
  argTypes: {
    disabled: {
      defaultValue: false,
      control: 'boolean'
    },
    hideOwner: {
      defaultValue: false,
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

export const Managed: StoryObj<ComponentType> = {
  render: ({ onAction, hideOwner, disabled }) => {
    const [selected, setSelected] = useState(false)
    const nft = useMemo(
      pipe<[], Nft, SelectableNft, SelectableNft, SelectableNft, SelectableNft>(
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
        options={{ owner: { hide: hideOwner } }}
        onAction={onAction}
        onToggleSelection={(nft) => {
          setSelected(!nft.selected)
        }}
      />
    )
  }
}
