'use client'
import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { type ListingItem } from '@echo/model/types/listing-item'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { CreateListingModalBody } from '@echo/ui/components/listing/create/create-listing-modal-body'
import type { Target } from '@echo/ui/types/target'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export interface CreateListingModalProps {
  target: Target | undefined
  items: ListingItem[]
  open: boolean
  collections: CollectionProviderResult[] | undefined
  isMutating?: boolean
  onCollectionSelectionChange?: (selection: CollectionProviderResult | undefined) => unknown
  onTargetAmountChange?: (targetCollectionSlug: string, amount: number) => unknown
  onClear?: VoidFunction
  onContinue?: VoidFunction
  onConfirm?: VoidFunction
  onClose?: VoidFunction
}

export const CreateListingModal: FunctionComponent<CreateListingModalProps> = ({
  open,
  isMutating,
  onClose,
  ...rest
}) => {
  const t = useTranslations('listing.new.confirmationModal')
  const closeCallback = isMutating ? undefined : onClose
  return (
    <Modal
      open={open}
      onClose={closeCallback}
      backButton={{
        label: t('backBtn'),
        onBack: closeCallback
      }}
    >
      <CreateListingModalBody isMutating={isMutating} {...rest} />
    </Modal>
  )
}
