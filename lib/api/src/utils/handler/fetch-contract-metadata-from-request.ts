import { getContractMetadata, GetContractMetadataResponse } from '@echo/alchemy'
import { TargetRequest } from '@echo/api-public'
import { findContractByAddress } from '@echo/firebase-admin'
import { identity } from 'ramda'

export const fetchContractMetadataFromRequest = (target: TargetRequest): Promise<GetContractMetadataResponse> =>
  findContractByAddress(target)
    .then(() => Promise.reject('Contract already exist'))
    .catch(() =>
      getContractMetadata(target.address)
        .then(identity)
        .catch(() => Promise.reject('Error fetching contract metadata'))
    )
