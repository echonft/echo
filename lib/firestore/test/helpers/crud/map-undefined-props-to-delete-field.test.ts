import { mapUndefinedPropsToDeleteField } from '../../../src/helpers/crud/map-undefined-props-to-delete-field'
import { describe, expect, it } from '@jest/globals'
import { FieldValue } from 'firebase-admin/firestore'

describe('helpers - crud', () => {
  it('all undefined props should now be FieldValue.delete()', () => {
    const documentData = {
      undefinedProp1: undefined,
      notUndefinedProp1: '',
      undefinedProp2: undefined,
      notUndefinedProp2: 1,
      undefinedProp3: undefined,
      notUndefinedProp3: {
        prop: 'prop'
      },
      notUndefinedProp4: {
        prop: undefined
      }
    }
    expect(mapUndefinedPropsToDeleteField(documentData)).toStrictEqual({
      undefinedProp1: FieldValue.delete(),
      undefinedProp2: FieldValue.delete(),
      undefinedProp3: FieldValue.delete()
    })
  })
})
