'use client'
import { type OwnedNft } from '@echo/model/types/nft'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const CreateOfferSenderNftsSelection: FunctionComponent<Props> = ({ nfts, selection, onSelect, onUnselect }) => {
  return (
    <SelectableNfts
      nfts={nfts}
      selection={selection}
      options={{ owner: { hide: true } }}
      style={{ selectionContainer: { minWitdh: true } }}
      onSelect={onSelect}
      onUnselect={onUnselect}
    />
  )
}
