import { ironOptions } from '../config/iron-options'
import { createOfferHandler } from '../handlers/offer/create-offer-handler'
import { deleteOfferHandler } from '../handlers/offer/delete-offer-handler'
import { updateOfferHandler } from '../handlers/offer/update-offer-handler'
import { ErrorResponse, OfferResponse } from '../types'
import { CreateOfferApiRequest } from '../types/models/api-requests/create-offer-api-request'
import { DeleteOfferApiRequest } from '../types/models/api-requests/delete-offer-api-request'
import { UpdateOfferApiRequest } from '../types/models/api-requests/update-offer-api-request'
import { withExistingUser } from '../utils/with-existing-user'
import { withMethodValidation } from '../utils/with-method-validation'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<OfferResponse | ErrorResponse>): Promise<void> => {
  const { method } = req
  if (method === 'POST') {
    await createOfferHandler(req as CreateOfferApiRequest, res)
  } else if (method === 'PUT') {
    await updateOfferHandler(req as UpdateOfferApiRequest, res)
  } else {
    await deleteOfferHandler(req as DeleteOfferApiRequest, res)
  }
}

export const offer = withIronSessionApiRoute(
  withExistingUser(withMethodValidation(handler, ['PUT', 'DELETE', 'POST'])),
  ironOptions
)
