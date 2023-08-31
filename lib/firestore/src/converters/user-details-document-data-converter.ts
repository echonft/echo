import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { UserDetails } from '../types/model/user-details'
import { UserDetailsDocumentData } from '../types/model/user-details-document-data'
import { walletDocumentDataConverter } from './wallet-document-data-converter'
import { assocUndefinedIfPropNotPresent, removeUndefinedProps } from '@echo/utils'
import { pipe } from 'ramda'

export const userDetailsDocumentDataConverter: FirestoreDocumentDataConverter<UserDetailsDocumentData, UserDetails> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(
    assocUndefinedIfPropNotPresent('discordAvatar'),
    assocUndefinedIfPropNotPresent('discordBanner'),
    modifyDocumentDataProp('wallet', walletDocumentDataConverter)
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(removeUndefinedProps, modifyModelProp('wallet', walletDocumentDataConverter))
}
