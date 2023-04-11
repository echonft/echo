import { CreateOfferFetcher } from '@components/create-offer-fetcher'
import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface Props {
  messages: MessagesType
}

const CreateOffer: PageWithAuth<Props> = () => {
  const router = useRouter()
  const { collectionId } = router.query
  return <CreateOfferFetcher collectionId={collectionId as string} />
}

CreateOffer.authenticationEnabled = true

export const getServerSideProps: GetServerSideProps<Props> = ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}

export default CreateOffer
