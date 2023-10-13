import type { OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { propIsNotEmpty } from '@echo/utils/fp/prop-is-not-empty'
import { assoc, either, head, is, pipe } from 'ramda'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface NewOfferState {
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  receiver: () => User | undefined
  setReceiverItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  setSenderItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  clearOffer: () => void
  hasNewOfferPending: () => boolean
}

export const useNewOfferStore = create<NewOfferState>()(
  devtools(
    (set, get) => ({
      receiverItems: [],
      senderItems: [],
      receiver: () => {
        const receiverItems = get().receiverItems
        if (isNonEmptyArray(receiverItems)) {
          return head(receiverItems).nft.owner
        }
        return undefined
      },
      setReceiverItems: (args) => {
        function setState(items: OfferItem[]) {
          set(assoc('receiverItems', items))
        }
        if (is(Function, args)) {
          setState(args(get().receiverItems))
        } else {
          setState(args)
        }
      },
      setSenderItems: (args) => {
        function setState(items: OfferItem[]) {
          set(assoc('senderItems', items))
        }
        if (is(Function, args)) {
          setState(args(get().senderItems))
        } else {
          setState(args)
        }
      },
      clearOffer: () => set(pipe(assoc('receiverItems', []), assoc('senderItems', []))),
      hasNewOfferPending: () => pipe(get, either(propIsNotEmpty('receiverItems'), propIsNotEmpty('senderItems')))()
    }),
    {
      name: 'new-offer-storage'
    }
  )
)
