import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

interface Props {
  messages: MessagesType
}

const CollectionPage: NextPage<Props> = () => {
  const router = useRouter()
}

export const getServerSideProps: GetServerSideProps<Props> = ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}

export default CollectionPage
