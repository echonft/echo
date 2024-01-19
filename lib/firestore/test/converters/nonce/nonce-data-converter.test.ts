import { nonceDataConverter } from '@echo/firestore/converters/nonce/nonce-data-converter'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'
import { futureDate } from '@echo/utils/helpers/future-date'
import { pastDate } from '@echo/utils/helpers/past-date'
import { describe, expect, it } from '@jest/globals'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { assoc, pipe } from 'ramda'

describe('converters - nonceDataConverter', () => {
  const expiresAt = futureDate()
  const id = 'nonce-id'
  const nonce = 'nonce'
  const userId = 'user-id'
  const document: Nonce = {
    expired: false,
    expiresAt,
    id,
    nonce,
    userId
  }
  const documentData: NonceDocumentData = {
    expiresAt,
    id,
    nonce,
    userId
  }
  const snapshot = {
    id,
    exists: true,
    data: () => documentData
  } as QueryDocumentSnapshot<NonceDocumentData>

  it('from Firestore conversion', () => {
    expect(nonceDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('from Firestore conversion - expired', () => {
    const expiredAt = pastDate()
    const expiredSnapshot = {
      id,
      exists: true,
      data: () => assoc('expiresAt', expiredAt, documentData)
    } as QueryDocumentSnapshot<NonceDocumentData>
    const expiredDocument = pipe(assoc('expiresAt', expiredAt), assoc('expired', true))(document)
    expect(nonceDataConverter.fromFirestore(expiredSnapshot)).toStrictEqual(expiredDocument)
  })

  it('to Firestore conversion', () => {
    expect(nonceDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
