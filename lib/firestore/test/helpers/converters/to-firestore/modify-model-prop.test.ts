import { modifyModelProp } from '../../../../src/helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../../../../src/types/converters/firestore-document-data-converter'
import { describe, expect, it } from '@jest/globals'
import { invoker, modify } from 'ramda'

describe('helpers - converters - to-firestore - modifyModelProp', () => {
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
    expect(modifyModelProp('c', stringToNumberConverter)(obj)).toStrictEqual(obj)
  })
  it('removes the prop if the original prop is undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyModelProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })
  it('returns converted document if the prop is a model', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        toConvert: 10
      }
    }
    expect(modifyModelProp('c', stringToNumberConverter)(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: {
        toConvert: '10'
      }
    })
  })
})
