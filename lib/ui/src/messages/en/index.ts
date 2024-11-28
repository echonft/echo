export const messages = {
  auth: {
    discord: {
      btn: 'Link Discord',
      title: 'Link your Discord profile to start swapping'
    },
    'join-discord': {
      btn: 'Join our Discord now!',
      skipBtn: 'Skip',
      title:
        'Hey {username}! If you have come this far it is because you want to be part of the future of NFT swapping. Get ready to live the Echo experience and transform the Web3 space with us!'
    },
    sign: {
      btn: 'Sign',
      title: 'Please sign a message to link your wallet to your profile'
    },
    wallet: {
      title: 'Start by connecting your wallet'
    }
  },
  collection: {
    details: {
      supply: '{supply, number, ::K} NFTs'
    },
    empty: {
      items: {
        message: 'There is no NFT for this collection'
      },
      listings: {
        btn: 'Create listing',
        message: 'There is currently no active listing for this collection'
      },
      swaps: {
        btn: 'Create listing',
        message: 'No swaps have been done for this collection yet'
      }
    },
    filters: {
      traits: {
        button: {
          title: '{trait}'
        },
        title: 'Attributes'
      }
    },
    list: {
      header: {
        collection: 'Collection',
        rank: 'Rank',
        swapsCount: '# Swaps'
      }
    },
    page: {
      title: 'Collections Stats'
    },
    search: {
      emptyResults: 'No collections found',
      label: 'Search by collection name'
    },
    thumbnail: {
      supply: '{supply, number, ::K} NFTs'
    },
    tile: {
      swapsCount: '{count, plural, =0 {No Swap} =1 {1 Swap} other {{count} Swaps}}'
    }
  },
  counts: {
    listingsCount: '{count, plural, =1 {<bold>1</bold> Listing Created} other {<bold>#</bold> Listings Created}}',
    nftsCount: '{count, plural, =1 {<bold>1</bold> NFT} other {<bold>#</bold> NFTs}}',
    offersCount: '{count, plural, =1 {<bold>1</bold> Offer Created} other {<bold>#</bold> Offers Created}}',
    swapsCount: '{count, plural, =1 {<bold>1</bold> Swap} other {<bold>#</bold> Swaps}}'
  },
  error: {
    listing: {
      cancel: 'An error occurred while trying to cancel the listing. Please try again',
      fill: 'An error occurred while trying to fill the listing. Please try again',
      new: 'An error occurred while trying to create the listing. Please try again'
    },
    offer: {
      accept: 'An error occurred while trying to accept the offer. Please try again',
      cancel: 'An error occurred while trying to cancel the offer. Please try again',
      create: 'An error occurred while trying to create the offer. Please try again',
      redeem: 'An error occured while trying to redeem your {count, plural, =1 {NFT} other {NFTs}}. Please try again',
      reject: 'An error occurred while trying to reject the offer. Please try again',
      swap: 'An error occurred while trying to swap the assets. Please try again'
    }
  },
  errorPage: {
    homeBtn: 'Take me home',
    resetBtn: 'Try again',
    title: 'Something went wrong'
  },
  home: {
    discord: {
      btn: 'Join our Discord',
      title: 'Join our community and start\nswapping now'
    },
    rankedCollections: {
      btn: 'Explore all'
    },
    recentSwaps: {
      title: 'Recent swaps'
    },
    subtitle: 'Revolutionizing NFT Swapping and Communication!',
    title: 'OTC trade your NFTs\nin the safest way',
    topCollections: {
      title: 'Top collections'
    }
  },
  layout: {
    header: {
      button: {
        login: 'Login'
      },
      search: {
        placeHolder: 'Search for collections or users'
      }
    },
    tab: {
      explore: 'Explore',
      items: 'Items',
      listings: 'Listings',
      offers: 'Offers',
      swaps: 'Swaps'
    }
  },
  listing: {
    create: {
      steps: {
        collection: 'Target a Collection',
        review: 'Review',
        done: 'Listing Done!'
      },
      cancelBtn: 'Cancel',
      cancelBtnMessage: 'Hold to cancel',
      createBtn: 'Create',
      editBtn: 'Edit',
      nextBtn: 'Next',
      reviewBtn: 'Review',
      reviewTitle: 'Review your offer',
      targets: {
        empty: 'To add a collection, type its name in the input above',
        search: {
          placeHolder: 'Search for collections'
        }
      },
      expiration: {
        title: 'One <yellow>last step</yellow>\n before we create the listing!',
        subtitle: 'Set the expiration date to:',
        finalizeBtn: 'Finalize',
        editBtn: 'Edit'
      }
    },
    details: {
      banner: {
        title: 'Select your NFTs to fill the listing'
      },
      cancelBtn: {
        label: 'Cancel',
        message: 'Hold to cancel'
      },
      expiredAt: 'Expired',
      expiresAt: 'Expires in',
      fillBtn: 'Fill Listing',
      offers: {
        empty: 'There are currently no offers on the listing',
        title: 'Current offers'
      },
      target: {
        quantity: 'x{count}'
      }
    },
    state: {
      CANCELLED: 'Cancelled',
      EXPIRED: 'Expired',
      OPEN: 'Active'
    }
  },
  nft: {
    action: {
      listing: 'Create listing',
      offer: 'Create offer'
    }
  },
  notFoundPage: {
    homeBtn: 'Take me home',
    subtitle: 'nothing here',
    title: 'Sorry, there’s'
  },
  offer: {
    accepted: {
      title: 'Congrats!',
      subtitle: 'You have accepted an <yellow>offer</yellow> with Echo!',
      description:
        '{count, plural, =1 {Your NFT is now} other {Your NFTs are now}} in escrow\nuntil the offer is executed or it expires',
      offerBtn: 'View offer'
    },
    cancelled: {
      title: 'Cancelled!',
      subtitle:
        "Your offer is <red>cancelled</red>, but don't worry,\n we kept your {count, plural, =1 {NFT} other {NFTs}} safe for you",
      description: '{count, plural, =1 {Your NFT is now} other {Your NFTs are now}} back in your wallet',
      homepageBtn: 'Back to the homepage'
    },
    create: {
      steps: {
        counterparty: 'Counter party',
        offer: 'Your Offer',
        review: 'Review',
        done: 'Offer Done!'
      },
      assets: {
        in: 'Requesting',
        out: 'Offering'
      },
      backBtn: 'Back',
      nextBtn: 'Next',
      createBtn: 'Create',
      approveBtn: 'Approve',
      cancelBtn: 'Cancel',
      cancelBtnMessage: 'Hold to cancel',
      editBtn: 'Edit',
      reviewBtn: 'Review',
      reviewTitle: 'Review your offer',
      modal: {
        approval: {
          subtitle: 'To create the offer, you first need to approve the Echo contract to escrow your NFTs'
        },
        create: {
          btn: {
            label: 'Create',
            loading: 'Creating...'
          },
          subtitle: 'Great! Now you just need to sign the transaction to create the offer.',
          description:
            "This transaction will place your {count, plural, =1 {NFT} other {NFTs}} in escrow.\nDon't worry, its safe with us."
        },
        title: 'Create Offer'
      }
    },
    created: {
      title: 'Congrats!',
      subtitle: 'You have created an <yellow>offer</yellow> with Echo!',
      description:
        'Your {count, plural, =1 {NFT is now} other {NFTs are now}} in escrow\nuntil the offer is accepted or it expires',
      offerBtn: 'View offer'
    },
    details: {
      acceptBtn: 'Accept',
      acceptModal: {
        approval: {
          subtitle: 'To accept the offer, you first need to approve the Echo contract to escrow your NFTs'
        },
        accept: {
          btn: {
            label: 'Accept',
            loading: 'Accepting...'
          },
          subtitle: 'Great! Now you just need to sign the transaction to accept the offer.',
          description: `This transaction will cost {fees} ether.\nThis transaction will place your {count, plural, =1 {NFT} other {NFTs}} in escrow.
Don't worry, its safe with us.`
        },
        title: 'Accept Offer'
      },
      approveModal: {
        btn: {
          label: 'Approve',
          loading: 'Approving...'
        }
      },
      cancelBtn: {
        label: 'Cancel',
        message: 'Hold to cancel',
        loading: 'Cancelling...'
      },
      completeBtn: 'Swap',
      expiredAt: 'Expired',
      expiresAt: 'Expires in',
      redeemBtn: {
        label: 'Redeem your {count, plural, =1 {NFT} other {NFTs}}',
        loading: 'Redeeming...'
      },
      rejectBtn: {
        label: 'Reject',
        message: 'Hold to reject',
        loading: 'Rejecting...'
      },
      swapModal: {
        execute: {
          btn: {
            label: 'Swap',
            loading: 'Swapping...'
          },
          subtitle: 'Great! Now you just need to sign the transaction to execute the trade.',
          description:
            'This transaction will cost {fees} ether.\nThis transaction will swap your {count, plural, =1 {NFT} other {NFTs}}.'
        },
        title: 'Execute Swap'
      }
    },
    executed: {
      title: 'Congrats!',
      subtitle: 'You have completed an <yellow>offer</yellow> with Echo!',
      description: '{count, plural, =1 {Your new NFT is now} other {Your new NFTs are now}} in your wallet',
      offerBtn: 'Back to the homepage'
    },
    expired: {
      title: 'Expired!',
      subtitle:
        "Your offer <red>expired</red>, but don't worry,\n we kept your {count, plural, =1 {NFT} other {NFTs}} safe for you",
      description: '{count, plural, =1 {Your NFT is now} other {Your NFTs are now}} back in your wallet',
      homepageBtn: 'Back to the homepage'
    },
    redeemed: {
      title: 'Redeemed!',
      subtitle: 'You have <yellow>redeemed</yellow> your {count, plural, =1 {NFT} other {NFTs}}!',
      description: '{count, plural, =1 {Your NFT is now} other {Your NFTs are now}} back in your wallet',
      homepageBtn: 'Back to the homepage'
    },
    rejected: {
      title: 'Rejected!',
      subtitle: 'You <red>rejected</red> the offer!',
      description: "Don't feel bad, we're sure there are other NFTs for you out there!",
      homepageBtn: 'Back to the homepage'
    },
    state: {
      ACCEPTED: 'Accepted',
      CANCELLED: 'Cancelled',
      COMPLETED: 'Swapped',
      EXPIRED: 'Expired',
      OPEN: 'Pending',
      REJECTED: 'Rejected'
    }
  },
  profile: {
    empty: {
      explore: {
        btn: 'Create listing',
        message: 'There is currently no pending listing for you'
      },
      items: {
        message: 'You do not own any NFT available on Echo'
      },
      listings: {
        btn: 'Create listing',
        message: 'You have not created any listing yet'
      },
      offers: {
        btn: 'Create listing',
        message: 'You have not made any offer yet'
      },
      pendingOffers: {
        btn: 'Create listing',
        message: 'You currently do not have any pending offer'
      }
    },
    listingButton: {
      create: 'Create listing',
      finalize: 'Finalize listing'
    },
    offerButton: 'Finalize offer'
  },
  search: {
    category: {
      collection: '{count, plural, =1 {Collection} other {Collections}}',
      user: '{count, plural, =1 {User} other {Users}}'
    },
    emptyResults: 'No results'
  },
  trade: {
    details: {
      expiredAt: 'Expired',
      expiresAt: 'Expires in'
    },
    collectionSelector: {
      subtitle: 'How many NFTs do you want in exchange?',
      placeholder: 'Amount',
      btn: 'Add',
      search: {
        title: 'Target a Collection',
        placeHolder: 'Search for a collection'
      }
    },
    create: {
      backBtn: 'Back',
      nextBtn: 'Next'
    },
    expiration: {
      selector: {
        '1d': '1 day',
        '3d': '3 days',
        '7d': '7 days'
      },
      title: 'Set the expiration date to:'
    },
    stepIndicator: 'Step {step}',
    tokenSelector: {
      title: 'Add tokens',
      subtitle: 'Optional',
      placeholder: 'Amount',
      max: 'Max',
      balance: 'Balance: {balance}',
      btn: 'Add'
    }
  },
  user: {
    authUser: 'You',
    button: 'Make an offer',
    empty: {
      items: {
        message: 'This user does not own any NFT'
      },
      listings: {
        btn: 'Make an offer',
        message: 'This user does not have any active listing'
      },
      swaps: {
        btn: 'Make an offer',
        message: 'This user has not made any swap'
      }
    },
    filters: {
      collection: {
        title: 'Collections'
      }
    }
  },
  wallet: {
    button: {
      copied: 'Copied!',
      label: 'Connect'
    },
    modal: {
      title: 'Oops! Wallet not connected',
      subtitle: 'Looks like your wallet is not connected. Connect and sign with the button below'
    },
    status: {
      linkToOtherUser: 'This wallet is already linked to another user',
      unavailable: 'Please connect with the wallet you used to sign up'
    }
  }
}
