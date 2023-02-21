import { getFirestoreOfferActivityData } from '../../data/offer/get-firestore-offer-activity-data'
import { offerData } from '../../utils/test/mocks/offer/offer-data'
import { describe, expect, it } from '@jest/globals'
import { equals, pipe, prop } from 'ramda'

describe('convertOfferActivity', () => {
  it('correct conversion', async () => {
    const offerActivity = await getFirestoreOfferActivityData('LyCfl6Eg7JKuD7XJ6IPi', 'cGCs8kb08vhMMlMwcd9n')
    expect(offerActivity).toEqual(
      offerData['LyCfl6Eg7JKuD7XJ6IPi']!.activities.data!.find(pipe(prop('id'), equals('cGCs8kb08vhMMlMwcd9n')))
    )
  })
})
