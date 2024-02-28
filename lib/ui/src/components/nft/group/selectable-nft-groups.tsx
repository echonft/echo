'use client'
import type { Nft } from '@echo/model/types/nft'
import { SelectableNftGroupsLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-groups-layout'
import { SelectableNftGroup } from '@echo/ui/components/nft/group/selectable-nft-group'
import { type SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { disable } from '@echo/ui/helpers/disableable/disable'
import { enable } from '@echo/ui/helpers/disableable/enable'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { enableAction } from '@echo/ui/helpers/nft/enable-action'
import { groupNftsByOwner } from '@echo/ui/helpers/nft/group/group-nfts-by-owner'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import type { NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { motion } from 'framer-motion'
import { find, flatten, includes, isEmpty, map, modify, pipe, prop, propEq, unless } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props extends Pick<SelectableNftCardProps, 'options' | 'onAction'> {
  nfts: Nft[]
  style?: {
    collapsible?: boolean
  }
  onSelectionUpdate?: (selection: SelectableNft[]) => unknown
}

export const SelectableNftGroups: FunctionComponent<Props> = ({
  nfts,
  options,
  style,
  onAction,
  onSelectionUpdate
}) => {
  const [groups, setGroups] = useState<NftGroup[]>([])
  const onNftToggleSelection = (nft: Nft) => {
    setGroups((currentGroups) => {
      const updatedGroups = map<NftGroup, NftGroup>(
        modify('nfts', toggleSelectionInList<SelectableNft>(propEq(nft.id, 'id')))
      )(currentGroups)
      const updatedGroup = find(
        pipe<[NftGroup], SelectableNft[], string[], boolean>(prop('nfts'), map(prop('id')), includes(nft.id))
      )(updatedGroups)!
      const selection = pipe(prop('nfts'), getSelectionInList<SelectableNft>)(updatedGroup)
      if (isEmpty(selection)) {
        return pipe(
          map<NftGroup, NftGroup>(modify('nfts', map<SelectableNft, SelectableNft>(pipe(enableAction, enable))))
        )(updatedGroups)
      } else {
        // if one group has a selection, disable all the items of the other groups
        return map<NftGroup, NftGroup>(
          pipe(
            modify('nfts', map(disableAction)),
            unless<NftGroup, NftGroup>(propEq(updatedGroup.id, 'id'), modify('nfts', map(disable<SelectableNft>)))
          ),
          updatedGroups
        )
      }
    })
  }

  // set the initial groups + update the groups when the underlying NFTs change
  useEffect(() => {
    setGroups(groupNftsByOwner(nfts))
  }, [nfts])

  // update groups disabled state based on selection + toggle a selection update when groups change
  useEffect(() => {
    const selection = pipe(map(pipe(prop('nfts'), getSelectionInList<SelectableNft>)), flatten)(groups)
    onSelectionUpdate?.(selection)
  }, [groups, onSelectionUpdate])

  return (
    <SelectableNftGroupsLayout style={style}>
      {map((group) => {
        if (style?.collapsible) {
          return (
            <motion.div
              key={group.id}
              layout={'position'}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SelectableNftGroup
                group={group}
                options={options}
                style={style}
                onToggleSelection={onNftToggleSelection}
                onAction={onAction}
              />
            </motion.div>
          )
        }
        return (
          <SelectableNftGroup
            key={group.id}
            group={group}
            options={options}
            style={style}
            onToggleSelection={onNftToggleSelection}
            onAction={onAction}
          />
        )
      }, groups)}
    </SelectableNftGroupsLayout>
  )
}
