import { getContractMetadata, GetContractMetadataResponse } from '@echo/alchemy'
import { TargetRequest } from '@echo/api-public'
import { findContractByAddress } from '@echo/firestore'
import { errorMessage } from '@echo/utils'
import { identity } from 'ramda'

export const fetchContractMetadataFromRequest = (target: TargetRequest): Promise<GetContractMetadataResponse> =>
  findContractByAddress(target)
    .then(() => Promise.reject('Contract already exist'))
    .catch((e) =>
      errorMessage(e) === 'Contract already exist'
        ? Promise.reject(e)
        : getContractMetadata(target.address)
            .then(identity)
            .catch(() => Promise.reject('Error fetching contract metadata'))
    )
