export const mockFriends = [
  {
    id: '1',
    username: 'sarah_johnson',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    username: 'mike_chen',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    lastActive: '5 minutes ago'
  },
  {
    id: '3',
    username: 'emma_wilson',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    lastActive: '1 hour ago'
  },
  {
    id: '4',
    username: 'alex_garcia',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    lastActive: '30 minutes ago'
  },
  {
    id: '5',
    username: 'lisa_brown',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    lastActive: '3 hours ago'
  },
  {
    id: '6',
    username: 'david_lee',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    lastActive: '15 minutes ago'
  },
  {
    id: '7',
    username: 'anna_martin',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
    lastActive: '4 hours ago'
  },
  {
    id: '8',
    username: 'ryan_taylor',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ryan',
    lastActive: '1 day ago'
  }
]

export const mockPosts = [
  {
    id: '1',
    user: {
      username: 'sarah_johnson',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    frontPhoto: 'https://picsum.photos/400/600?random=1',
    backPhoto: 'https://picsum.photos/400/600?random=2',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: 'Downtown Cafe',
    caption: 'Morning coffee vibes ☕️',
    likes: 12,
    comments: 3,
    isLiked: false
  },
  {
    id: '2',
    user: {
      username: 'mike_chen',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
    },
    frontPhoto: 'https://picsum.photos/400/600?random=3',
    backPhoto: 'https://picsum.photos/400/600?random=4',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    location: 'Central Park',
    caption: 'Beautiful day for a walk! 🌳',
    likes: 8,
    comments: 5,
    isLiked: true
  },
  {
    id: '3',
    user: {
      username: 'emma_wilson',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma'
    },
    frontPhoto: 'https://picsum.photos/400/600?random=5',
    backPhoto: 'https://picsum.photos/400/600?random=6',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    location: 'Home',
    likes: 15,
    comments: 2,
    isLiked: false
  },
  {
    id: '4',
    user: {
      username: 'alex_garcia',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex'
    },
    frontPhoto: 'https://picsum.photos/400/600?random=7',
    backPhoto: 'https://picsum.photos/400/600?random=8',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    location: 'Gym',
    caption: 'Leg day complete! 💪',
    likes: 20,
    comments: 7,
    isLiked: true
  },
  {
    id: '5',
    user: {
      username: 'lisa_brown',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa'
    },
    frontPhoto: 'https://picsum.photos/400/600?random=9',
    backPhoto: 'https://picsum.photos/400/600?random=10',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    location: 'Beach',
    caption: 'Sunset dinner 🌅',
    likes: 25,
    comments: 4,
    isLiked: false
  }
]