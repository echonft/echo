import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import type { Collection } from '@echo/model/types/collection'
import { removeNilProps } from '@echo/utils/helpers/remove-nil-props'

export const collectionDocumentMockPx = removeNilProps<Collection, CollectionDocument>(collectionMockPx)

export const collectionDocumentMockSpiral = removeNilProps<Collection, CollectionDocument>(collectionMockSpiral)
