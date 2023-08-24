import { getAddress } from 'ethers'
import { pipe, prop } from 'ramda'

export const addressPropFromFirestore = () => pipe(prop('address'), getAddress)
