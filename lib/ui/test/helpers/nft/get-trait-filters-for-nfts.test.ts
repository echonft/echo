import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { describe, expect, test } from '@jest/globals'

describe('helpers - nft - getTraitFiltersForNfts', () => {
  test('returns the right traits for mock nfts', () => {
    expect(getTraitFiltersForNfts(getAllNftMocks())).toEqual([
      {
        filters: [
          {
            attribute: {
              trait: 'Algorithm',
              value: 'archimedean'
            },
            count: 1,
            id: 'Algorithm-archimedean',
            label: 'archimedean'
          },
          {
            attribute: {
              trait: 'Algorithm',
              value: 'hyperbolic'
            },
            count: 1,
            id: 'Algorithm-hyperbolic',
            label: 'hyperbolic'
          },
          {
            attribute: {
              trait: 'Algorithm',
              value: 'fermat'
            },
            count: 1,
            id: 'Algorithm-fermat',
            label: 'fermat'
          }
        ],
        id: 'Algorithm',
        label: 'Algorithm'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Animation',
              value: 'movie'
            },
            count: 1,
            id: 'Animation-movie',
            label: 'movie'
          },
          {
            attribute: {
              trait: 'Animation',
              value: 'short'
            },
            count: 1,
            id: 'Animation-short',
            label: 'short'
          },
          {
            attribute: {
              trait: 'Animation',
              value: 'opera'
            },
            count: 1,
            id: 'Animation-opera',
            label: 'opera'
          }
        ],
        id: 'Animation',
        label: 'Animation'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Background',
              value: '#complement'
            },
            count: 2,
            id: 'Background-#complement',
            label: '#complement'
          },
          {
            attribute: {
              trait: 'Background',
              value: '#777777'
            },
            count: 1,
            id: 'Background-#777777',
            label: '#777777'
          },
          {
            attribute: {
              trait: 'Background',
              value: 'Blue Gradiant'
            },
            count: 1,
            id: 'Background-Blue Gradiant',
            label: 'Blue Gradiant'
          },
          {
            attribute: {
              trait: 'Background',
              value: 'Red Gradiant'
            },
            count: 1,
            id: 'Background-Red Gradiant',
            label: 'Red Gradiant'
          },
          {
            attribute: {
              trait: 'Background',
              value: 'Pine Forest'
            },
            count: 1,
            id: 'Background-Pine Forest',
            label: 'Pine Forest'
          }
        ],
        id: 'Background',
        label: 'Background'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Beard',
              value: 'Dashing Dandy'
            },
            count: 1,
            id: 'Beard-Dashing Dandy',
            label: 'Dashing Dandy'
          },
          {
            attribute: {
              trait: 'Beard',
              value: 'The Sage'
            },
            count: 1,
            id: 'Beard-The Sage',
            label: 'The Sage'
          }
        ],
        id: 'Beard',
        label: 'Beard'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Clothes',
              value: 'Ruby Secret Order'
            },
            count: 1,
            id: 'Clothes-Ruby Secret Order',
            label: 'Ruby Secret Order'
          },
          {
            attribute: {
              trait: 'Clothes',
              value: 'Blue Opal Champion'
            },
            count: 1,
            id: 'Clothes-Blue Opal Champion',
            label: 'Blue Opal Champion'
          }
        ],
        id: 'Clothes',
        label: 'Clothes'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Clothing',
              value: 'Green Jade Warrior'
            },
            count: 1,
            id: 'Clothing-Green Jade Warrior',
            label: 'Green Jade Warrior'
          }
        ],
        id: 'Clothing',
        label: 'Clothing'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Colors',
              value: '0001'
            },
            count: 2,
            id: 'Colors-0001',
            label: '0001'
          },
          {
            attribute: {
              trait: 'Colors',
              value: '0011'
            },
            count: 1,
            id: 'Colors-0011',
            label: '0011'
          }
        ],
        id: 'Colors',
        label: 'Colors'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Crown',
              value: 'Silver Mystic'
            },
            count: 1,
            id: 'Crown-Silver Mystic',
            label: 'Silver Mystic'
          },
          {
            attribute: {
              trait: 'Crown',
              value: 'Indigo Fin'
            },
            count: 1,
            id: 'Crown-Indigo Fin',
            label: 'Indigo Fin'
          }
        ],
        id: 'Crown',
        label: 'Crown'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Demigod',
              value: 'Creative'
            },
            count: 2,
            id: 'Demigod-Creative',
            label: 'Creative'
          }
        ],
        id: 'Demigod',
        label: 'Demigod'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Density',
              value: 'cumulus'
            },
            count: 3,
            id: 'Density-cumulus',
            label: 'cumulus'
          }
        ],
        id: 'Density',
        label: 'Density'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Elemental',
              value: 'Water'
            },
            count: 1,
            id: 'Elemental-Water',
            label: 'Water'
          }
        ],
        id: 'Elemental',
        label: 'Elemental'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Eye Accessory',
              value: 'Kiwi Retrowave'
            },
            count: 1,
            id: 'Eye Accessory-Kiwi Retrowave',
            label: 'Kiwi Retrowave'
          }
        ],
        id: 'Eye Accessory',
        label: 'Eye Accessory'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Eyes',
              value: 'White'
            },
            count: 1,
            id: 'Eyes-White',
            label: 'White'
          },
          {
            attribute: {
              trait: 'Eyes',
              value: 'Battle'
            },
            count: 1,
            id: 'Eyes-Battle',
            label: 'Battle'
          },
          {
            attribute: {
              trait: 'Eyes',
              value: 'Gold'
            },
            count: 1,
            id: 'Eyes-Gold',
            label: 'Gold'
          }
        ],
        id: 'Eyes',
        label: 'Eyes'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Face Mask',
              value: 'Angelite Kitsune'
            },
            count: 1,
            id: 'Face Mask-Angelite Kitsune',
            label: 'Angelite Kitsune'
          }
        ],
        id: 'Face Mask',
        label: 'Face Mask'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Hair',
              value: 'The Genius'
            },
            count: 2,
            id: 'Hair-The Genius',
            label: 'The Genius'
          },
          {
            attribute: {
              trait: 'Hair',
              value: 'Gentle Waterfall'
            },
            count: 1,
            id: 'Hair-Gentle Waterfall',
            label: 'Gentle Waterfall'
          }
        ],
        id: 'Hair',
        label: 'Hair'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Halo',
              value: 'Bronze And Gold'
            },
            count: 1,
            id: 'Halo-Bronze And Gold',
            label: 'Bronze And Gold'
          },
          {
            attribute: {
              trait: 'Halo',
              value: 'Silver And Gold'
            },
            count: 1,
            id: 'Halo-Silver And Gold',
            label: 'Silver And Gold'
          }
        ],
        id: 'Halo',
        label: 'Halo'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Palette',
              value: 'random1'
            },
            count: 2,
            id: 'Palette-random1',
            label: 'random1'
          },
          {
            attribute: {
              trait: 'Palette',
              value: 'pasture3'
            },
            count: 1,
            id: 'Palette-pasture3',
            label: 'pasture3'
          }
        ],
        id: 'Palette',
        label: 'Palette'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Ring',
              value: 'main'
            },
            count: 2,
            id: 'Ring-main',
            label: 'main'
          },
          {
            attribute: {
              trait: 'Ring',
              value: 'halo'
            },
            count: 1,
            id: 'Ring-halo',
            label: 'halo'
          }
        ],
        id: 'Ring',
        label: 'Ring'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Skin',
              value: 'Sunkissed'
            },
            count: 2,
            id: 'Skin-Sunkissed',
            label: 'Sunkissed'
          },
          {
            attribute: {
              trait: 'Skin',
              value: 'Water Base'
            },
            count: 1,
            id: 'Skin-Water Base',
            label: 'Water Base'
          }
        ],
        id: 'Skin',
        label: 'Skin'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Speed',
              value: '5'
            },
            count: 3,
            id: 'Speed-5',
            label: '5'
          }
        ],
        id: 'Speed',
        label: 'Speed'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Tattoo',
              value: 'Mark Of Power Gold'
            },
            count: 1,
            id: 'Tattoo-Mark Of Power Gold',
            label: 'Mark Of Power Gold'
          },
          {
            attribute: {
              trait: 'Tattoo',
              value: 'Mark Of Tide Blue'
            },
            count: 1,
            id: 'Tattoo-Mark Of Tide Blue',
            label: 'Mark Of Tide Blue'
          },
          {
            attribute: {
              trait: 'Tattoo',
              value: 'Mark Of Power Purple'
            },
            count: 1,
            id: 'Tattoo-Mark Of Power Purple',
            label: 'Mark Of Power Purple'
          }
        ],
        id: 'Tattoo',
        label: 'Tattoo'
      },
      {
        filters: [
          {
            attribute: {
              trait: 'Wings',
              value: 'Feathered Wings'
            },
            count: 2,
            id: 'Wings-Feathered Wings',
            label: 'Feathered Wings'
          }
        ],
        id: 'Wings',
        label: 'Wings'
      }
    ])
  })
})
