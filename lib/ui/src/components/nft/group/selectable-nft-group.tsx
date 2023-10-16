'use client'
import type { Nft } from '@echo/model/types/nft'
import { NftGroupButton } from '@echo/ui/components/nft/group/nft-group-button'
import { NftGroupLayout } from '@echo/ui/components/nft/layout/nft-group-layout'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SelectableNftThumbnail } from '@echo/ui/components/nft/thumbnail/selectable-nft-thumbnail'
import { getGroupSelectionCount } from '@echo/ui/helpers/selection/get-group-selection-count'
import { DisableableType } from '@echo/ui/types/disableable'
import { Group } from '@echo/ui/types/group'
import { SelectableType } from '@echo/ui/types/selectable'
import { Transition } from '@headlessui/react'
import { map } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  group: Group<DisableableType<SelectableType<Nft>>>
  hideOwner?: boolean
  onToggleSelection?: (nft: DisableableType<SelectableType<Nft>>, groupId: string) => unknown
}

export const SelectableNftGroup: FunctionComponent<Props> = ({ group, hideOwner, onToggleSelection }) => {
  const { id, name, items } = group
  const hasSelection = getGroupSelectionCount(group) > 0
  const [collapsed, setCollapsed] = useState(true)

  return (
    <NftGroupLayout>
      <NftGroupButton
        name={name}
        collapsed={collapsed ?? false}
        onToggleCollapsed={(collapsed) => {
          // can't collapse if at least one NFT is selected
          if (!collapsed && hasSelection) {
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
                linkDisabled={hasSelection}
                hideOwner={hideOwner}
                onToggleSelection={(nft: Nft) => {
                  onToggleSelection?.(nft, id)
                }}
              />
            ),
            items
          )}
        </NftsLayout>
      </Transition>
    </NftGroupLayout>
  )
}
