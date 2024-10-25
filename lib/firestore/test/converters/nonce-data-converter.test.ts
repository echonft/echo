import { nonceDataConverter } from '@echo/firestore/converters/nonce-data-converter'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce-document-data'
import type { Nonce } from '@echo/model/types/nonce'
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
    nonce,
    userId
  }
  const documentData: NonceDocumentData = {
    expiresAt,
    nonce,
    userId
  }
  const snapshot = {
    id,
    exists: true,
    data: () => documentData
  } as QueryDocumentSnapshot<Nonce, NonceDocumentData>

  it('from Firestore conversion', () => {
    expect(nonceDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('from Firestore conversion - expired', () => {
    const expiredAt = pastDate()
    const expiredSnapshot = {
      id,
      exists: true,
      data: () => assoc('expiresAt', expiredAt, documentData)
    } as QueryDocumentSnapshot<Nonce, NonceDocumentData>
    const expiredDocument = pipe(assoc('expiresAt', expiredAt), assoc('expired', true))(document)
    expect(nonceDataConverter.fromFirestore(expiredSnapshot)).toStrictEqual(expiredDocument)
  })

  it('to Firestore conversion', () => {
    expect(nonceDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
