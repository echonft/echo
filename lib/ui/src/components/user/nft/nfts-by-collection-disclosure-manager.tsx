'use client'
import { NftsByCollectionDisclosure } from './nfts-by-collection-disclosure'
import { Nft } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import { concat, isEmpty, without } from 'ramda'
import { FunctionComponent, useState } from 'react'

interface Props {
  nfts: NonEmptyArray<Nft>
  initialSelection?: string[]
  onSelectionUpdate?: (selection: string[]) => unknown
}

export const NftsByCollectionDisclosureManager: FunctionComponent<Props> = ({
  nfts,
  initialSelection,
  onSelectionUpdate
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const [selection, setSelection] = useState(initialSelection ?? [])
  return (
    <NftsByCollectionDisclosure
      nfts={nfts}
      collapsed={collapsed}
      onToggleCollapsed={(collapsed) => {
        // can't collapse if at least one NFT is selected
        if (!collapsed && !isEmpty(selection)) {
          return
        }
        setCollapsed(collapsed)
      }}
      selection={selection}
      onRemoveSelection={(value) => {
        const newSelection = without([value], selection)
        setSelection(newSelection)
        onSelectionUpdate?.(newSelection)
      }}
      onAddSelection={(value) => {
        const newSelection = concat([value], selection)
        setSelection(newSelection)
        onSelectionUpdate?.(newSelection)
      }}
    />
  )
}
