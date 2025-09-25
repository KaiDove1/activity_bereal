import { useState } from 'react'
import { User } from 'lucide-react'

interface LoginProps {
  onLogin: (userData: any) => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    const userData = {
      id: Date.now().toString(),
      username: username.trim(),
      joinedAt: new Date().toISOString(),
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      friends: []
    }

    onLogin(userData)
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <User size={60} className="login-icon" />
          <h1>BeReal</h1>
          <p>Your friends for real.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="login-button">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="login-toggle">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="toggle-button"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login