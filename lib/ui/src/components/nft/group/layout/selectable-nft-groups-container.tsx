import { NftGroupsLayout } from '@echo/ui/components/nft/group/layout/nft-groups-layout'
import { SelectableNftGroup } from '@echo/ui/components/nft/group/selectable-nft-group'
import { type Group } from '@echo/ui/types/group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  groups: Group<SelectableNft>[]
  hideOwner?: boolean
  onToggleSelection?: (nft: SelectableNft, groupId: string) => unknown
  onAction?: (nft: SelectableNft) => unknown
}

export const SelectableNftGroupsContainer: FunctionComponent<Props> = ({
  groups,
  hideOwner,
  onToggleSelection,
  onAction
}) => {
  return (
    <NftGroupsLayout>
      {map(
        (group) => (
          <SelectableNftGroup
            key={group.id}
            group={group}
            hideOwner={hideOwner}
            onToggleSelection={onToggleSelection}
            onAction={onAction}
          />
        ),
        groups
      )}
    </NftGroupsLayout>
  )
}
