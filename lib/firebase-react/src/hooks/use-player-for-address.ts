import { useCollection } from './use-collection'
import { FirestoreDocumentPath, FirestorePlayer, mapPlayer } from '@echo/firestore'
import { Player } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { limit, where } from 'firebase/firestore'
import { isNil } from 'ramda'
import { SWRResponse } from 'swr'

export const usePlayerForAddress = (address: string): Omit<SWRResponse<R.Result<Player, Error>, Error>, 'mutate'> => {
  const response = useCollection<FirestorePlayer, Player>(FirestoreDocumentPath.PLAYERS, mapPlayer, {
    constraints: [where('wallet', '==', address), limit(1)]
  })
  if (isNil(response.data)) {
    return Object.assign(response, { data: undefined })
  }
  // FIXME this is not gonna work if the player is not found (players will be an empty array)
  return Object.assign(response, { data: R.map(response.data, (players: Player[]) => players[0]!) })
}
