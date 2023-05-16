import { convertContract } from '../../converters/contract/convert-contract'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName } from '@echo/firestore'
import { andThen, pipe } from 'ramda'

export const getFirestoreContractData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertContract))(CollectionName.CONTRACTS, documentPath)
