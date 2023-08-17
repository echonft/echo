import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { UserDetails } from '../types/model/user-details'
import { UserDetailsDocumentData } from '../types/model/user-details-document-data'
import { applySpec, prop } from 'ramda'

export const userDetailsDocumentDataConverter: FirestoreDocumentDataConverter<UserDetailsDocumentData, UserDetails> = {
  fromFirestore: applySpec<UserDetails>({
    id: prop('id'),
    discordAvatar: prop('discordAvatar'),
    discordBanner: prop('discordBanner'),
    discordId: prop('discordId'),
    discordUsername: prop('discordUsername'),
    wallet: prop('wallet')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: removeUndefinedProps
}
