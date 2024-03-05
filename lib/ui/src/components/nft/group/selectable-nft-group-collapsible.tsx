'use client'
import { NftGroupButton } from '@echo/ui/components/nft/group/nft-group-button'
import { SelectableNfts } from '@echo/ui/components/nft/group/selectable-nfts'
import { type SelectableNftCardProps } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { type NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { complement, isEmpty, pipe, prop } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props extends Omit<SelectableNftCardProps, 'nft'> {
  group: NftGroup
  style?: {
    collapsed?: boolean
  }
}

export const SelectableNftGroupCollapsible: FunctionComponent<Props> = ({ group, style, ...cardProps }) => {
  const { label, nfts } = group
  const hasSelection = pipe(prop('nfts'), getSelectionInList<SelectableNft>, complement(isEmpty))(group)
  const [collapsed, setCollapsed] = useState(style?.collapsed ?? true)
  return (
    <motion.div
      className={clsx('flex', 'flex-col', 'gap-4', 'h-max')}
      layout={'position'}
      transition={{ ease: 'easeOut', duration: 0.1 }}
      initial={'hidden'}
      animate={'visible'}
      exit={'hidden'}
      variants={{
        visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.3 } },
        hidden: { opacity: 0 }
      }}
    >
      <NftGroupButton
        name={label}
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
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <SelectableNfts nfts={nfts} {...cardProps} />
      </Transition>
    </motion.div>
  )
}
