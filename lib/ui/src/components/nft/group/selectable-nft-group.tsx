'use client'
import { MultiSelectableProps } from '../../../types/multi-selectable-props'
import { NftGroupLayout } from '../layout/nft-group-layout'
import { NftsLayout } from '../layout/nfts-layout'
import { SelectableNftThumbnail } from '../thumbnail/selectable-nft-thumbnail'
import { NftGroupButton } from './nft-group-button'
import { Nft } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import { Transition } from '@headlessui/react'
import { concat, isEmpty, isNil, map, without } from 'ramda'
import { FunctionComponent, useState } from 'react'

interface Props extends MultiSelectableProps<string> {
  nfts: NonEmptyArray<Nft>
  name: string
  disabled?: boolean
}

export const SelectableNftGroup: FunctionComponent<Props> = ({
  nfts,
  name,
  selection,
  onSelectionUpdate,
  disabled
}) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <NftGroupLayout>
      <NftGroupButton
        name={name}
        collapsed={collapsed ?? false}
        onToggleCollapsed={(collapsed) => {
          // can't collapse if at least one NFT is selected
          if (!collapsed && !isEmpty(selection)) {
            return
          }
          setCollapsed(collapsed)
        }}
      />
      <Transition
        show={collapsed ?? false}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <NftsLayout>
          {map(
            (nft) => (
              <SelectableNftThumbnail
                key={nft.id}
                nft={nft}
                linkDisabled={!isEmpty(selection)}
                selected={!disabled && !isNil(selection) && selection.includes(nft.id)}
                disabled={disabled}
                onToggleSelection={(nftId: string, selected: boolean) => {
                  if (selected) {
                    onSelectionUpdate?.(concat([nftId], selection))
                  } else {
                    onSelectionUpdate?.(without([nftId], selection))
                  }
                }}
              />
            ),
            nfts
          )}
        </NftsLayout>
      </Transition>
    </NftGroupLayout>
  )
}
