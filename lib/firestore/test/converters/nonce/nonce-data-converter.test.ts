import { nonceDataConverter } from '@echo/firestore/converters/nonce/nonce-data-converter'
import type { FirestoreNonce } from '@echo/firestore/types/model/nonce/firestore-nonce'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import type { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

describe('converters - nonceDataConverter', () => {
  const nonceDocumentData: NonceDocumentData = {
    id: 'nonce-id',
    expiresAt: 1676984897,
    userId: 'user-id',
    nonce: 'nonce'
  }
  const nonce: FirestoreNonce = {
    id: 'nonce-id',
    expired: true,
    expiresAt: dayjs.unix(1676984897),
    userId: 'user-id',
    nonce: 'nonce'
  }
  it('from Firestore conversion', () => {
    const nonceSnashot = {
      ref: {
        id: 'nonce-id',
        path: 'nonces/nonce-id'
      } as unknown as DocumentReference<NonceDocumentData>,
      id: 'nonce-id',
      exists: true,
      data: () => nonceDocumentData
    } as QueryDocumentSnapshot<NonceDocumentData>
    expect(nonceDataConverter.fromFirestore(nonceSnashot)).toStrictEqual(nonce)
  })

  it('to Firestore conversion', () => {
    expect(nonceDataConverter.toFirestore(nonce)).toStrictEqual(nonceDocumentData)
  })
})
