export const messages = {
  auth: {
    step0: {
      continueBtn: 'Continue',
      loginBtn: 'Link Discord',
      subtitle: 'Start by linking your Discord profile to Echo!',
      title: 'Link your Discord'
    },
    step1: {
      continueBtn: 'Skip',
      joinBtn: 'Join our Discord Now!',
      subtitle:
        'If you have come this far it is because you want to be part of the future of NFT swapping, get ready to live the Echo experience and transform the Web3 space with us!',
      title: 'Hey there {username}!'
    },
    step2: {
      continueBtn: {
        connected: 'Continue',
        connecting: 'Skip',
        reconnecting: 'Skip',
        disconnected: 'Skip'
      },
      subtitle: 'Connect your wallet to start swapping',
      title: 'Connect your wallet'
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
    navigation: {
      items: 'Items',
      listings: 'Listings',
      swaps: 'Swaps'
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
  error: {
    listing: {
      cancel: 'An error occurred while trying to cancel the listing. Please try again',
      fill: 'An error occurred while trying to fill the listing. Please try again',
      new: 'An error occurred while trying to create the listing. Please try again'
    },
    offer: {
      accept: 'An error occurred while trying to accept the offer. Please try again',
      cancel: 'An error occurred while trying to cancel the offer. Please try again',
      new: 'An error occurred while trying to create the offer. Please try again',
      reject: 'An error occurred while trying to reject the offer. Please try again',
      swap: 'An error occurred while trying to swap the assets. Please try again'
    },
    profile: {
      addWallet: 'An error occurred while trying to add the wallet to your account. Please try again',
      signing: 'An error occurred while trying to sign the message. Please try again'
    }
  },
  errorPage: {
    homeBtn: 'Take me home',
    resetBtn: 'Try again',
    title: 'Something went wrong'
  },
  home: {
    discord: {
      btn: 'Join our discord',
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
    }
  },
  listing: {
    create: {
      assets: {
        in: 'Looking for',
        out: 'Offering'
      },
      cancelBtn: 'Cancel',
      cancelBtnMessage: 'Hold to cancel',
      createBtn: 'Create',
      editBtn: 'Edit',
      reviewBtn: 'Review',
      targets: {
        empty: 'To add a collection, type its name in the input above',
        search: {
          placeHolder: 'Search for collections'
        }
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
      FULFILLED: 'Fulfilled',
      OFFERS_PENDING: 'Offers pending',
      OPEN: 'Awaiting offers',
      PARTIALLY_FULFILLED: 'Partially fulfilled'
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
    create: {
      assets: {
        in: 'Requesting',
        out: 'Offering'
      },
      cancelBtn: 'Cancel',
      cancelBtnMessage: 'Hold to cancel',
      createBtn: 'Create',
      editBtn: 'Edit',
      reviewBtn: 'Review',
      expiration: {
        title: 'One <yellow>last step</yellow>\n before you let it\n go!',
        subtitle: 'Set the expiration date to:',
        selector: '{count} {count, plural, =1 { Day} other { Days}}',
        finalizeBtn: 'Finalize Offer',
        editBtn: 'Edit'
      },
      success: {
        title: 'Congrats!',
        subtitle: 'You have created an <yellow>offer</yellow> with Echo!',
        description:
          '{count, plural, =1 {Your NFT is now} other {Your NFTs are now}} in escrow\nuntil the offer is accepted or it expires',
        offerBtn: 'Go to the offer',
        homepageBtn: 'Back to the homepage'
      },
      expired: {
        title: 'Expired!',
        subtitle: "Your offer <red>expired</red>, but don't worry, we kept your NFTs safe until you redeem them",
        description: 'Your NFTs are now back in your wallet',
        homepageBtn: 'Back to the homepage'
      }
    },
    details: {
      acceptBtn: 'Accept',
      acceptModal: {
        approval: {
          subtitle: 'To accept the offer, you first need to approve the Echo contract to transfer your NFTs'
        },
        sign: {
          btn: 'Accept',
          subtitle: 'Great! Now you just need to sign a message so the counterparty can perform the swap'
        },
        title: 'Accept Offer'
      },
      approveModal: {
        btn: 'Approve'
      },
      cancelBtn: {
        label: 'Cancel',
        message: 'Hold to cancel'
      },
      completeBtn: 'Swap',
      expiredAt: 'Expired',
      expiresAt: 'Expires in',
      rejectBtn: {
        label: 'Reject',
        message: 'Hold to reject'
      },
      swapModal: {
        approval: {
          subtitle: 'To execute the swap, you first need to approve the Echo contract to transfer your NFTs'
        },
        execute: {
          btn: 'Swap',
          subtitle: 'Great! Now you just need to execute the trade'
        },
        title: 'Execute Swap'
      }
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
    navigation: {
      explore: 'Explore',
      items: 'Owned',
      listings: 'Listings',
      offers: 'Offers',
      pendingOffers: 'Pending Offers'
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
  user: {
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
    },
    navigation: {
      items: 'Items',
      listings: 'Listings',
      swaps: 'Swaps'
    }
  },
  wallet: {
    button: {
      copied: 'Copied!',
      label: {
        disconnected: 'Connect',
        connecting: 'Connecting...'
      }
    },
    modal: {
      title: 'Oops! Wallet not connected',
      subtitle: 'Looks like your wallet is not connected. Connect and sign with the button below'
    }
  }
}
