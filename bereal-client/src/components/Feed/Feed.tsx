import { useState, useEffect } from 'react'
import { Clock, Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { format, differenceInHours, startOfDay, addHours } from 'date-fns'
import PostCard from './PostCard'
import { mockPosts, mockFriends } from '../../data/mockData'

interface FeedProps {
  user: any
}

const Feed = ({ user }: FeedProps) => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState('')
  const [hasPostedToday, setHasPostedToday] = useState(false)
  const [dailyPromptTime, setDailyPromptTime] = useState<Date | null>(null)

  useEffect(() => {
    const today = startOfDay(new Date())
    const randomHour = Math.floor(Math.random() * 14) + 8
    const todaysPrompt = addHours(today, randomHour)
    setDailyPromptTime(todaysPrompt)

    const checkIfPosted = () => {
      const postedToday = localStorage.getItem(`posted_${user.id}_${format(today, 'yyyy-MM-dd')}`)
      setHasPostedToday(!!postedToday)
    }

    checkIfPosted()

    const timer = setInterval(() => {
      const now = new Date()
      const tomorrow = addHours(startOfDay(new Date()), 24 + Math.floor(Math.random() * 14) + 8)
      const diff = tomorrow.getTime() - now.getTime()
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${hours}h ${minutes}m`)
      } else {
        setTimeLeft('0h 0m')
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [user.id])

  const handleCameraClick = () => {
    navigate('/camera')
  }

  return (
    <div className="feed">
      <header className="feed-header">
        <h1>BeReal.</h1>
        <div className="time-info">
          <Clock size={16} />
          <span>{format(new Date(), 'HH:mm')}</span>
        </div>
      </header>

      {!hasPostedToday && (
        <div className="daily-prompt" onClick={handleCameraClick}>
          <div className="prompt-content">
            <Camera size={32} className="prompt-icon" />
            <div className="prompt-text">
              <h3>⚡ Time to BeReal. ⚡</h3>
              <p>2 min left to capture a BeReal and see what your friends are up to!</p>
            </div>
          </div>
          <div className="prompt-timer">
            <span>{timeLeft}</span>
          </div>
        </div>
      )}

      <div className="feed-content">
        <div className="feed-section">
          <h2>My Friends</h2>
          <div className="posts-container">
            {mockPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="feed-section">
          <h2>Discovery</h2>
          <div className="discovery-posts">
            {mockPosts.slice(0, 2).map(post => (
              <PostCard key={`discovery-${post.id}`} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed