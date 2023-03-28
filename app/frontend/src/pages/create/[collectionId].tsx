import { CreateOfferFetcher } from '@components/create-offer-fetcher'
import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const DynamicAuthPage = dynamic(() => import('@components/auth').then((mod) => mod.Auth), {
  ssr: false
})

interface Props {
  messages: MessagesType
}

const CreateOffer: AuthenticatedPage<Props> = () => {
  const router = useRouter()
  const { collectionId } = router.query
  return (
    <DynamicAuthPage>
      <CreateOfferFetcher collectionId={collectionId as string} />
    </DynamicAuthPage>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}

export default CreateOffer
