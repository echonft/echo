'use client'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { User } from '@echo/model/types/user'
import {
  SelectableNftsContainer,
  type SelectableNftsContainerProps
} from '@echo/ui/components/nft/selectable/selectable-nfts-container'
import { filterNftsByOwner } from '@echo/ui/helpers/nft/filters/filter-nfts-by-owner'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { append, filter, head, identity, isEmpty, pipe, prop, reject } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface SelectableNftsProps extends Omit<SelectableNftsContainerProps, 'selection' | 'onSelect' | 'onUnselect'> {
  initialSelection?: SelectableNft[]
  onSelectionUpdate?: (selection: SelectableNft[]) => unknown
}

export const SelectableNfts: FunctionComponent<SelectableNftsProps> = ({
  nfts,
  initialSelection,
  onSelectionUpdate,
  ...props
}) => {
  const [selectableNfts, setSelectableNfts] = useState<SelectableNft[]>(nfts)
  const [selection, setSelection] = useState<SelectableNft[]>(initialSelection ?? [])

  // trigger selection update when it changes
  useEffect(() => {
    onSelectionUpdate?.(selection)
  }, [selection, onSelectionUpdate])

  // remove any NFTs in the selection that are not found in the underlying NFTs when they change
  // it will also update selectableNfts since it triggers a selection update
  useEffect(() => {
    setSelection(filter(isInWith(nfts, eqNft)))
  }, [nfts])

  // adjust selectable NFTs according to the seclection
  useEffect(() => {
    const selectionEmpty = isEmpty(selection)
    const filterFn = selectionEmpty
      ? identity
      : pipe<[SelectableNft[]], SelectableNft, User, (nfts: SelectableNft[]) => SelectableNft[]>(
          head,
          prop('owner'),
          filterNftsByOwner<SelectableNft>
        )(selection)
    setSelectableNfts(filterFn)
  }, [selection])

  const onSelect = (nft: SelectableNft) => {
    setSelection(append(nft))
  }
  const onUnselect = (nft: SelectableNft) => {
    setSelection(reject(eqNft(nft)))
  }
  return (
    <SelectableNftsContainer
      nfts={selectableNfts}
      selection={selection}
      onSelect={onSelect}
      onUnselect={onUnselect}
      {...props}
    />
  )
}
