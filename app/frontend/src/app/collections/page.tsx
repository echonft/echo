import { withFirebase } from '@echo/frontend/lib/decorators/with-firebase'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { getCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-collections-with-swaps-count'
import { CollectionsPage } from '@echo/ui/pages/collection/list/collections-page'
import { pipe } from 'ramda'

async function render() {
  const collections = await getCollectionsWithSwapsCount(100)
  return <CollectionsPage collections={collections} />
}

export default pipe(withLocale, withFirebase)(render)
