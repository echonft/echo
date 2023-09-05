import { modifyDocumentDataArrayProp } from '../../../../src/helpers/converters/from-firestore/modify-document-data-array-prop'
import { FirestoreDocumentDataConverter } from '../../../../src/types/converters/firestore-document-data-converter'
import { describe, expect, it } from '@jest/globals'
import { modify } from 'ramda'

describe("helpers - converters - from-firestore - modifyDocumentDataArrayProp'", () => {
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
    expect(modifyDocumentDataArrayProp('c', stringToNumberConverter)(obj)).toStrictEqual({
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
    expect(modifyDocumentDataArrayProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })
  it('returns converted document array if the prop is a document data array', () => {
    const obj = {
      a: 1,
      b: 2,
      c: [
        {
          toConvert: '10'
        },
        {
          toConvert: '100'
        }
      ]
    }
    expect(modifyDocumentDataArrayProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: [
        {
          toConvert: 10
        },
        {
          toConvert: 100
        }
      ]
    })
  })
})
