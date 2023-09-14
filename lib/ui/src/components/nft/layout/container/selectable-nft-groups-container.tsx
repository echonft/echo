import { SelectableNftGroup } from '@echo/ui/components/nft/group/selectable-nft-group'
import { NftGroupsLayout } from '@echo/ui/components/nft/layout/nft-groups-layout'
import type { Group } from '@echo/ui/types/group'
import type { GroupSelection } from '@echo/ui/types/group-selection'
import type { Nft } from '@echo/ui/types/model/nft'
import type { MultiSelectableProps } from '@echo/ui/types/multi-selectable-props'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { assoc, concat, find, findIndex, isNil, map, propEq, update } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends MultiSelectableProps<GroupSelection> {
  groups: NonEmptyArray<Group<Nft>>
  hideOwner?: boolean
}

function getGroupSelection(groupId: string, selection: Array<GroupSelection>) {
  const groupSelection = find(propEq(groupId, 'id'), selection)
  if (isNil(groupSelection)) {
    return []
  }
  return groupSelection.selection
}

function updateGroupSelection(
  groupId: string,
  selection: string[],
  groupSelection: Array<GroupSelection>
): Array<GroupSelection> {
  const groupIndex = findIndex(propEq(groupId, 'id'), groupSelection)
  if (groupIndex === -1) {
    return concat([{ id: groupId, selection }], groupSelection)
  }
  const updatedSelection = assoc('selection', selection, groupSelection[groupIndex])
  return update(groupIndex, updatedSelection, groupSelection)
}

export const SelectableNftGroupsContainer: FunctionComponent<Props> = ({
  groups,
  selection,
  hideOwner,
  onSelectionUpdate
}) => {
  return (
    <NftGroupsLayout>
      {map(
        ({ id, name, items, disabled }) => (
          <SelectableNftGroup
            key={id}
            nfts={items}
            name={name}
            hideOwner={hideOwner}
            disabled={disabled}
            selection={getGroupSelection(id, selection)}
            onSelectionUpdate={(newSelection) => {
              onSelectionUpdate?.(updateGroupSelection(id, newSelection, selection))
            }}
          />
        ),
        groups
      )}
    </NftGroupsLayout>
  )
}
