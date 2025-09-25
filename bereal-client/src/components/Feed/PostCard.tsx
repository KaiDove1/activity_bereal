import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'

interface PostCardProps {
  post: {
    id: string
    user: {
      username: string
      profilePicture: string
    }
    frontPhoto: string
    backPhoto: string
    timestamp: string
    location?: string
    caption?: string
    likes: number
    comments: number
    isLiked: boolean
  }
}

const PostCard = ({ post }: PostCardProps) => {
  const timeAgo = format(new Date(post.timestamp), 'h:mm a')

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <img 
            src={post.user.profilePicture} 
            alt={post.user.username}
            className="user-avatar"
          />
          <div className="user-details">
            <h4>{post.user.username}</h4>
            <p className="post-time">{timeAgo}</p>
            {post.location && <p className="post-location">{post.location}</p>}
          </div>
        </div>
        <button className="more-button">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="post-images">
        <div className="main-image">
          <img src={post.backPhoto} alt="Back camera" />
          <div className="front-image-overlay">
            <img src={post.frontPhoto} alt="Front camera" />
          </div>
        </div>
      </div>

      {post.caption && (
        <div className="post-caption">
          <p>{post.caption}</p>
        </div>
      )}

      <div className="post-actions">
        <button className={`action-button ${post.isLiked ? 'liked' : ''}`}>
          <Heart size={20} fill={post.isLiked ? '#ff6b6b' : 'none'} />
          <span>{post.likes}</span>
        </button>
        <button className="action-button">
          <MessageCircle size={20} />
          <span>{post.comments}</span>
        </button>
      </div>
    </div>
  )
}

export default PostCard