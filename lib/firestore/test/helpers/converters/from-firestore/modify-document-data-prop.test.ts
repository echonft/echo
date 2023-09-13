import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import { describe, expect, it } from '@jest/globals'
import { modify } from 'ramda'

describe("helpers - converters - from-firestore - modifyDocumentDataPropToModel'", () => {
  const stringToNumberConverter: FirestoreDocumentDataConverter<
    object & Record<'toConvert', string>,
    object & Record<'toConvert', number>
  > = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fromFirestore: modify('toConvert', Number.parseInt),
    toFirestore: () => {
      throw Error('should not be called')
    }
  }

  it('returns the object as is if the prop is not in the original object', () => {
    const obj = {
      a: 1,
      b: 2
    }
    expect(modifyDocumentDataProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })
  it('removes the prop if the original prop is undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyDocumentDataProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })
  it('returns converted document if the prop is a document data', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        toConvert: '10'
      }
    }
    expect(modifyDocumentDataProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: {
        toConvert: 10
      }
    })
  })
})
