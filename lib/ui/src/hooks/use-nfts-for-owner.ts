import { GetNftResponse, getNftsForOwner, GetNftsForOwnerRequest } from '@echo/alchemy'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, or, pipe, prop } from 'ramda'
import useSWR from 'swr'

export const useNftsForOwner = (owner: string, contractAddresses: string[]) =>
  useSWR<R.Result<GetNftResponse, Error>, Error, SwrKey<GetNftsForOwnerRequest> | undefined>(
    getConditionalFetchKey(
      {
        name: SwrKeyNames.ALCHEMY_GET_NFTS_FOR_USER,
        data: {
          owner,
          contractAddresses
        }
      },
      always(or(isNilOrEmpty(owner), isNilOrEmpty(contractAddresses)))
    ),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(prop('data'), getNftsForOwner)
  )
