'use client'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { OwnedNft } from '@echo/model/types/nft'
import { SelectableNftCardsLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-cards-layout'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { isInWith } from '@echo/utils/helpers/is-in-with'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { isEmpty, isNil, map, pipe, sort } from 'ramda'
import { type FunctionComponent, type ReactNode, useCallback } from 'react'

export interface SelectableNftsProps extends Pick<SelectableNftCardProps, 'action' | 'options' | 'onAction'> {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  disablePredicate?: (nft: OwnedNft) => boolean
  onSelect?: (nft: OwnedNft) => void
  onUnselect?: (nft: OwnedNft) => void
}

export const SelectableNftCards: FunctionComponent<SelectableNftsProps> = ({
  nfts,
  selection,
  action,
  disablePredicate,
  options,
  onAction,
  onSelect,
  onUnselect
}) => {
  const sortNfts = useCallback(
    (nftA: OwnedNft, nftB: OwnedNft): number => {
      if (isNil(disablePredicate)) {
        return 0
      }
      if (disablePredicate(nftA)) {
        if (disablePredicate(nftB)) {
          return 0
        }
        return 1
      }
      if (disablePredicate(nftB)) {
        return -1
      }
      return 0
    },
    [disablePredicate]
  )

  return (
    <div className={clsx('flex', 'flex-col', 'gap-8', 'grow')}>
      <SelectableNftCardsLayout>
        {pipe<[OwnedNft[]], OwnedNft[], ReactNode[]>(
          sort(sortNfts),
          map((nft) => (
            <motion.div
              key={serializeNft(nft)}
              layout={'position'}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SelectableNftCard
                nft={nft}
                action={isEmpty(selection) ? action : undefined}
                disabled={isNil(disablePredicate) ? false : disablePredicate(nft)}
                selected={isInWith(selection, eqNft, nft)}
                options={options}
                onAction={onAction}
                onSelect={onSelect}
                onUnselect={onUnselect}
              />
            </motion.div>
          ))
        )(nfts)}
      </SelectableNftCardsLayout>
    </div>
  )
}
