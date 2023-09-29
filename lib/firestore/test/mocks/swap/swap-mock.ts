import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import dayjs from 'dayjs'

export const swapMock: Record<string, FirestoreSwap> = {
  '2ipuV3drjQlzEgkUkW7q': {
    id: '2ipuV3drjQlzEgkUkW7q',
    offerId: 'ASkFpKoHEHVH0gd69t1G',
    txId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b',
    date: dayjs.unix(1676984897)
  }
}
