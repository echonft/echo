'use client'
import type { Swap } from '@echo/model/types/offer/swap'
import { type FunctionComponent } from 'react'

export interface SwapCardProps {
  swap: Swap
  options?: {
    asLink?: boolean
    scaleDisabled?: boolean
  }
  onSelect?: (swap: Swap) => unknown
}

// TODO ERC20 + ERC1155
export const SwapCard: FunctionComponent<SwapCardProps> = () => {
  // export const SwapCard: FunctionComponent<SwapCardProps> = ({ swap, options, onSelect }) => {
  // const stack = pipe(offerItems, getNftStackFromNfts)(swap)
  // return (
  //   <StackLayout
  //     className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
  //     onClick={() => {
  //       onSelect?.(swap)
  //     }}
  //   >
  //     <SwapStackPicture stack={stack} swap={swap} scaleDisabled={options?.scaleDisabled} />
  //     <StackFooter title={stack.collection.name} subtitle={stack.tokenId} />
  //   </StackLayout>
  // )
  return null
}
