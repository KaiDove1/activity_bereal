import { useState, useEffect } from 'react'
import { Settings, Calendar, Users, Camera, LogOut } from 'lucide-react'
import { format } from 'date-fns'
import PostCard from '../Feed/PostCard'

interface ProfileProps {
  user: any
  onLogout: () => void
}

const Profile = ({ user, onLogout }: ProfileProps) => {
  const [userPosts, setUserPosts] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    friends: 0,
    streak: 0
  })

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('userPosts') || '[]')
    const userSpecificPosts = posts.filter((post: any) => post.user.username === user.username)
    setUserPosts(userSpecificPosts)
    
    setStats({
      totalPosts: userSpecificPosts.length,
      friends: user.friends?.length || 12,
      streak: Math.floor(Math.random() * 30) + 1
    })
  }, [user])

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <img 
            src={user.profilePicture} 
            alt={user.username}
            className="profile-picture"
          />
          <div className="profile-details">
            <h1>{user.username}</h1>
            <p className="join-date">
              <Calendar size={16} />
              Joined {format(new Date(user.joinedAt), 'MMMM yyyy')}
            </p>
          </div>
        </div>
        <button onClick={onLogout} className="logout-button">
          <LogOut size={20} />
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <Camera size={20} />
          <div>
            <span className="stat-number">{stats.totalPosts}</span>
            <span className="stat-label">BeReals</span>
          </div>
        </div>
        <div className="stat-item">
          <Users size={20} />
          <div>
            <span className="stat-number">{stats.friends}</span>
            <span className="stat-label">Friends</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="streak-icon">🔥</span>
          <div>
            <span className="stat-number">{stats.streak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="profile-action-button">
          <Settings size={20} />
          Settings
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>My BeReals</h2>
          {userPosts.length > 0 ? (
            <div className="profile-posts">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <Camera size={48} className="no-posts-icon" />
              <h3>No BeReals yet</h3>
              <p>Start sharing your authentic moments!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile