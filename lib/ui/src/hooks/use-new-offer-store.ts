import { type OfferItem } from '@echo/model/types/offer-item'
import { type User } from '@echo/model/types/user'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { propIsNotEmpty } from '@echo/utils/fp/prop-is-not-empty'
import { assoc, either, head, is, pipe } from 'ramda'
import { create } from 'zustand'

interface NewOfferState {
  modalOpen: boolean
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  receiver: () => User | undefined
  setReceiverItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  setSenderItems: (args: ((items: OfferItem[]) => OfferItem[]) | OfferItem[]) => unknown
  clearOffer: VoidFunction
  openModal: VoidFunction
  closeModal: VoidFunction
  hasNewOfferPending: () => boolean
}

export const useNewOfferStore = create<NewOfferState>((set, get) => ({
  modalOpen: false,
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
  clearOffer: () => set(pipe(assoc('modalOpen', false), assoc('receiverItems', []), assoc('senderItems', []))),
  openModal: () => set(assoc('modalOpen', true)),
  closeModal: () => set(assoc('modalOpen', false)),
  hasNewOfferPending: () => pipe(get, either(propIsNotEmpty('receiverItems'), propIsNotEmpty('senderItems')))()
}))
