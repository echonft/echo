import type { ListingItem } from '@echo/model/types/listing-item'
import type { Target } from '@echo/ui/components/listing/new/new-listing-manager'
import { propIsNotEmpty } from '@echo/utils/fp/prop-is-not-empty'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import { assoc, either, is, pipe } from 'ramda'
import { create } from 'zustand'

interface NewListingState {
  modalOpen: boolean
  target: Target | undefined
  items: ListingItem[]
  setTarget: (args: ((target: Target | undefined) => Target) | Target | undefined) => unknown
  setItems: (args: ((items: ListingItem[]) => ListingItem[]) | ListingItem[]) => unknown
  clearListing: VoidFunction
  openModal: VoidFunction
  closeModal: VoidFunction
  hasNewListingPending: () => boolean
}

export const useNewListingStore = create<NewListingState>((set, get) => ({
  modalOpen: false,
  target: undefined,
  items: [],
  setTarget: (args) => {
    function setState(target: Target | undefined) {
      set(assoc('target', target))
    }
    if (is(Function, args)) {
      setState(args(get().target))
    } else {
      setState(args)
    }
  },
  setItems: (args) => {
    function setState(items: ListingItem[]) {
      set(assoc('items', items))
    }
    if (is(Function, args)) {
      setState(args(get().items))
    } else {
      setState(args)
    }
  },
  clearListing: () => {
    set(pipe(assoc('items', []), assoc('target', undefined)))
  },
  openModal: () => set(assoc('modalOpen', true)),
  closeModal: () => set(assoc('modalOpen', false)),
  hasNewListingPending: () => pipe(get, either(propIsNotEmpty('items'), propIsNotNil('target')))()
}))
