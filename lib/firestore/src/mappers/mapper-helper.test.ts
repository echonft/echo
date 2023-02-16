import { FirestoreContract } from '../types/model/collections/contract/firestore-contract'
import { mockSnapshotDoc } from '../utils/tests/mock-snapshot-doc'
import {
  dataProp,
  dataPropPromise,
  dataPropWithMapper,
  dataPropWithMapperPromise,
  id,
  idPromise
} from './mapper-helper'
import { describe, expect, it } from '@jest/globals'
import { add } from 'ramda'

describe('mapper helper functions', () => {
  const documentId = 'contract'
  const firestoreContract: FirestoreContract = {
    address: '0x0',
    chainId: 1,
    tokenType: 'ERC721'
  }

  it('id', () => {
    const snapshot = mockSnapshotDoc<FirestoreContract>(documentId, firestoreContract)
    expect(id(snapshot)).toBe(documentId)
  })

  it('idPromise', () => {
    const snapshot = mockSnapshotDoc<FirestoreContract>(documentId, firestoreContract)
    return expect(idPromise(snapshot)).resolves.toBe(documentId)
  })

  it('dataProp', () => {
    const snapshot = mockSnapshotDoc<FirestoreContract>(documentId, firestoreContract)
    expect(dataProp('address')(snapshot)).toBe('0x0')
    expect(dataProp('chainId')(snapshot)).toBe(1)
  })

  it('dataPropPromise', () => {
    const snapshot = mockSnapshotDoc<FirestoreContract>(documentId, firestoreContract)
    return expect(dataPropPromise('address')(snapshot)).resolves.toBe('0x0')
  })

  it('dataPropWithMapper', () => {
    const snapshot = mockSnapshotDoc<FirestoreContract>(documentId, firestoreContract)
    expect(dataPropWithMapper('chainId', add(1))(snapshot)).toBe(2)
  })

  it('dataPropWithMapperPromise', () => {
    const snapshot = mockSnapshotDoc<FirestoreContract>(documentId, firestoreContract)
    return expect(dataPropWithMapperPromise('chainId', add(1))(snapshot)).resolves.toBe(2)
  })
})
