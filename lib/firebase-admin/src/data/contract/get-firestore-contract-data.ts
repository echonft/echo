import { convertContract } from '../../converters/contract'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreContractData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertContract))('contracts', documentPath)
