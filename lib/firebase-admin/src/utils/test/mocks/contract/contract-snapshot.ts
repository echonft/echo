import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { FirestoreContract } from '@echo/firestore'

export const contractSnapshots: { [key: string]: FirestoreSnapshot<FirestoreContract> } = {
  '37dBlwJYahEAKeL0rNP8': {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref: {
      path: 'contracts/37dBlwJYahEAKeL0rNP8'
    },
    id: '37dBlwJYahEAKeL0rNP8',
    exists: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data: () => ({
      tokenType: 'ERC721',
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      chainId: 1,
      name: 'BoredApeYachtClub',
      symbol: 'BAYC'
    })
  }
}
