const dummyThreads = [
  {
    id: '1',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '2',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '3',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '4',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '5',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '6',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '7',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '8',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '9',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: '10',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    ownerId: '',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  } if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }
  return 'just now';
}

export { dummyThreads, postedAt };
