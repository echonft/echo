import { modifyModelArrayProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-array-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import { describe, expect, it } from '@jest/globals'
import { invoker, modify } from 'ramda'

describe('helpers - converters - to-firestore - modifyModelArrayProp', () => {
  const stringToNumberConverter: FirestoreDocumentDataConverter<
    object & Record<'toConvert', string>,
    object & Record<'toConvert', number>
  > = {
    fromFirestore: () => {
      throw Error('should not be called')
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    toFirestore: modify('toConvert', invoker(0, 'toString'))
  }

  it('returns the same object if the prop is not in the original object', () => {
    const obj = {
      a: 1,
      b: 2
    }
    expect(modifyModelArrayProp('c', stringToNumberConverter)(obj)).toStrictEqual(obj)
  })
  it('removes the prop if the original prop is undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyModelArrayProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })
  it('returns array of converted document if the prop is an array of model objects', () => {
    const obj = {
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
    }
    expect(modifyModelArrayProp('c', stringToNumberConverter)(obj)).toStrictEqual({
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
    })
  })
})
