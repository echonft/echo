import { SelectableNftGroup } from '@echo/ui/components/nft/group/selectable-nft-group'
import { NftGroupsLayout } from '@echo/ui/components/nft/layout/nft-groups-layout'
import { DisableableType } from '@echo/ui/types/disableable'
import { Group } from '@echo/ui/types/group'
import type { Nft } from '@echo/ui/types/model/nft'
import { SelectableType } from '@echo/ui/types/selectable'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  groups: Group<DisableableType<SelectableType<Nft>>>[]
  hideOwner?: boolean
  onToggleSelection?: (nft: DisableableType<SelectableType<Nft>>, groupId: string) => unknown
}

export const SelectableNftGroupsContainer: FunctionComponent<Props> = ({ groups, hideOwner, onToggleSelection }) => {
  return (
    <NftGroupsLayout>
      {map(
        (group) => (
          <SelectableNftGroup
            key={group.id}
            group={group}
            hideOwner={hideOwner}
            onToggleSelection={onToggleSelection}
          />
        ),
        groups
      )}
    </NftGroupsLayout>
  )
}
