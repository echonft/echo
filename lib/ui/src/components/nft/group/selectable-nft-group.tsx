'use client'
import { SelectableNftGroupCollapsible } from '@echo/ui/components/nft/group/selectable-nft-group-collapsible'
import { SelectableNftGroupNotCollapsible } from '@echo/ui/components/nft/group/selectable-nft-group-not-collapsible'
import { type SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { type NftGroup } from '@echo/ui/types/nft-group'
import { type FunctionComponent } from 'react'

interface Props extends Omit<SelectableNftCardProps, 'nft'> {
  group: NftGroup
  style?: {
    collapsible?: boolean
  }
}

export const SelectableNftGroup: FunctionComponent<Props> = ({ style, ...rest }) => {
  if (style?.collapsible) {
    return <SelectableNftGroupCollapsible {...rest} />
  }
  return <SelectableNftGroupNotCollapsible {...rest} />
}
