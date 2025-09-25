import { Link, useLocation } from 'react-router-dom'
import { Home, Camera, Users, User } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bottom-navigation">
      <Link 
        to="/feed" 
        className={`nav-item ${isActive('/feed') ? 'active' : ''}`}
      >
        <Home size={24} />
        <span>Feed</span>
      </Link>
      
      <Link 
        to="/friends" 
        className={`nav-item ${isActive('/friends') ? 'active' : ''}`}
      >
        <Users size={24} />
        <span>Friends</span>
      </Link>
      
      <Link 
        to="/camera" 
        className={`nav-item camera-nav ${isActive('/camera') ? 'active' : ''}`}
      >
        <div className="camera-button">
          <Camera size={28} />
        </div>
      </Link>
      
      <Link 
        to="/profile" 
        className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
      >
        <User size={24} />
        <span>Profile</span>
      </Link>
    </nav>
  )
}

export default Navigation