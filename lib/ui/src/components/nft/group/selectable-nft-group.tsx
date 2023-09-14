'use client'
import { NftGroupButton } from '@echo/ui/components/nft/group/nft-group-button'
import { NftGroupLayout } from '@echo/ui/components/nft/layout/nft-group-layout'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SelectableNftThumbnail } from '@echo/ui/components/nft/thumbnail/selectable-nft-thumbnail'
import type { Nft } from '@echo/ui/types/model/nft'
import type { MultiSelectableProps } from '@echo/ui/types/multi-selectable-props'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { Transition } from '@headlessui/react'
import { concat, isEmpty, isNil, map, without } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props extends MultiSelectableProps<string> {
  nfts: NonEmptyArray<Nft>
  name: string
  disabled?: boolean
  hideOwner?: boolean
}

export const SelectableNftGroup: FunctionComponent<Props> = ({
  nfts,
  name,
  selection,
  hideOwner,
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
                hideOwner={hideOwner}
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
