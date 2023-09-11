import { collectionApiUrl, GetNftCollectionResponse } from '@echo/api'
import { CollectionDetailsApiProvided } from '@echo/ui/src/components/collection/api-provided/collection-details-api-provided'
import { fetcher } from '@helpers/fetcher'
import { ErrorStatus } from '@server/constants/error-status'
import { ApiError } from '@server/helpers/error/api-error'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug }, children }) => {
  const { data, error } = await fetcher(collectionApiUrl(slug)).fetch<GetNftCollectionResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      if ((error as ApiError).status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return (
    <>
      <section className={clsx('w-full')}>
        <CollectionDetailsApiProvided response={data.collection} />
      </section>
      <section className={clsx('w-full')}>{children}</section>
    </>
  )
}

export default CollectionLayout
