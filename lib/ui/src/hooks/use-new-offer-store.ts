import { OfferItem } from '@echo/ui/types/model/offer-item'
import { eqPaths } from '@echo/utils/fp/eq-paths'
import { propIsNotEmpty } from '@echo/utils/fp/prop-is-not-empty'
import { removeOrAddArrayFromArray } from '@echo/utils/fp/remove-or-add-array-from-array'
import { assoc, either, head, is, isEmpty, pipe } from 'ramda'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface NewOfferState {
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  setReceiverItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  setSenderItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  clearOffer: () => void
  hasNewOfferPending: () => boolean
}

export const useNewOfferStore = create<NewOfferState>()(
  devtools(
    (set, get) => ({
      receiver: undefined,
      receiverItems: [],
      senderItems: [],
      setReceiverItems: (args) => {
        function setState(items: OfferItem[]) {
          set((state) => {
            const { receiverItems: currentReceiverItems } = state
            if (isEmpty(currentReceiverItems) || isEmpty(items)) {
              return assoc('receiverItems', items, state)
            }
            // it's a new receiver, replace everything
            if (head(items)!.nft.owner.username !== head(currentReceiverItems)!.nft.owner.username) {
              return assoc('receiverItems', items, state)
            }
            // it's the same receiver, update the items
            return assoc(
              'receiverItems',
              removeOrAddArrayFromArray(currentReceiverItems, items, eqPaths(['nft', 'id'])),
              state
            )
          })
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
