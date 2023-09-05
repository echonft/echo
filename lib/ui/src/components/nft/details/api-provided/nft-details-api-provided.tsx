'use client'
import { NftDetails } from '../nft-details'
import { NftResponse } from '@echo/api'
import { mapNft } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  response: Partial<NftResponse>
}

export const NftDetailsApiProvided: FunctionComponent<Props> = ({ response }) => {
  return (
    <section className={clsx('w-full', 'pt-12')}>
      <NftDetails nft={mapNft(response)} />
    </section>
  )
}
