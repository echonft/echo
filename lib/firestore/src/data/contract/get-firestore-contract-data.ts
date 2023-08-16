import { CollectionName } from '../../constants/collection-name'
import { convertContract } from '../../converters/contract/convert-contract'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreContractData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertContract))(CollectionName.CONTRACTS, documentPath)
