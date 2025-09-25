import { useState } from 'react'
import { Search, UserPlus, Users, Clock } from 'lucide-react'
import { mockFriends } from '../../data/mockData'

interface FriendsProps {
  user: any
}

const Friends = ({ user }: FriendsProps) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFriends = mockFriends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderFriendItem = (friend: any, showAddButton = false) => (
    <div key={friend.id} className="friend-item">
      <div className="friend-info">
        <img 
          src={friend.profilePicture} 
          alt={friend.username}
          className="friend-avatar"
        />
        <div className="friend-details">
          <h4>{friend.username}</h4>
          <p className="friend-status">
            {friend.lastActive ? (
              <>
                <Clock size={14} />
                {friend.lastActive}
              </>
            ) : (
              'New to BeReal'
            )}
          </p>
        </div>
      </div>
      {showAddButton && (
        <button className="add-friend-button">
          <UserPlus size={18} />
        </button>
      )}
    </div>
  )

  return (
    <div className="friends">
      <div className="friends-header">
        <h1>Friends</h1>
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="friends-tabs">
        <button 
          className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          <Users size={18} />
          Friends ({mockFriends.length})
        </button>
        <button 
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <UserPlus size={18} />
          Requests (2)
        </button>
        <button 
          className={`tab ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          Suggestions
        </button>
      </div>

      <div className="friends-content">
        {activeTab === 'friends' && (
          <div className="friends-list">
            {filteredFriends.map(friend => renderFriendItem(friend))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="friend-requests">
            <div className="requests-section">
              <h3>Pending Requests</h3>
              {mockFriends.slice(0, 2).map(friend => (
                <div key={`request-${friend.id}`} className="request-item">
                  <div className="friend-info">
                    <img 
                      src={friend.profilePicture} 
                      alt={friend.username}
                      className="friend-avatar"
                    />
                    <div className="friend-details">
                      <h4>{friend.username}</h4>
                      <p>Wants to be your friend</p>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="accept-button">Accept</button>
                    <button className="decline-button">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="friend-suggestions">
            <h3>People you may know</h3>
            <div className="suggestions-list">
              {mockFriends.slice(3, 8).map(friend => renderFriendItem(friend, true))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Friends