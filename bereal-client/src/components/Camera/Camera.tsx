import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera as CameraIcon, RotateCcw, X, Check, Timer } from 'lucide-react'
import { format } from 'date-fns'

interface CameraProps {
  user: any
}

const Camera = ({ user }: CameraProps) => {
  const navigate = useNavigate()
  const [isCapturing, setIsCapturing] = useState(false)
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null)
  const [backPhoto, setBackPhoto] = useState<string | null>(null)
  const [currentCamera, setCurrentCamera] = useState<'front' | 'back'>('back')
  const [countdown, setCountdown] = useState<number | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [currentCamera])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentCamera === 'front' ? 'user' : 'environment' },
        audio: false
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
  }

  const capturePhoto = async () => {
    if (countdown !== null) return

    setIsCapturing(true)
    setCountdown(3)

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer)
          performCapture()
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const performCapture = async () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    if (videoRef.current && context) {
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      
      context.drawImage(videoRef.current, 0, 0)
      const photoData = canvas.toDataURL('image/jpeg', 0.8)
      
      if (currentCamera === 'back') {
        setBackPhoto(photoData)
        setCurrentCamera('front')
      } else {
        setFrontPhoto(photoData)
        setShowPreview(true)
        stopCamera()
      }
    }
    
    setIsCapturing(false)
  }

  const simulateCapture = () => {
    if (currentCamera === 'back') {
      setBackPhoto(`https://picsum.photos/400/600?random=${Date.now()}`)
      setCurrentCamera('front')
    } else {
      setFrontPhoto(`https://picsum.photos/400/600?random=${Date.now() + 1}`)
      setShowPreview(true)
      stopCamera()
    }
    setIsCapturing(false)
  }

  const retakePhoto = () => {
    if (currentCamera === 'front') {
      setFrontPhoto(null)
      setCurrentCamera('back')
    } else {
      setBackPhoto(null)
    }
    setShowPreview(false)
    startCamera()
  }

  const postBeReal = () => {
    if (frontPhoto && backPhoto) {
      const today = format(new Date(), 'yyyy-MM-dd')
      localStorage.setItem(`posted_${user.id}_${today}`, 'true')
      
      const newPost = {
        id: Date.now().toString(),
        user: {
          username: user.username,
          profilePicture: user.profilePicture
        },
        frontPhoto,
        backPhoto,
        timestamp: new Date().toISOString(),
        location: 'Your Location',
        likes: 0,
        comments: 0,
        isLiked: false
      }
      
      const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
      existingPosts.unshift(newPost)
      localStorage.setItem('userPosts', JSON.stringify(existingPosts))
      
      navigate('/feed')
    }
  }

  const goBack = () => {
    navigate('/feed')
  }

  if (showPreview && frontPhoto && backPhoto) {
    return (
      <div className="camera-preview">
        <div className="preview-header">
          <button onClick={retakePhoto} className="preview-button">
            <RotateCcw size={24} />
          </button>
          <h2>Your BeReal</h2>
          <button onClick={postBeReal} className="preview-button post-button">
            <Check size={24} />
          </button>
        </div>
        <div className="preview-images">
          <div className="main-preview">
            <img src={backPhoto} alt="Back camera" />
            <div className="front-preview-overlay">
              <img src={frontPhoto} alt="Front camera" />
            </div>
          </div>
        </div>
        <div className="preview-actions">
          <button onClick={retakePhoto} className="retake-button">
            Retake
          </button>
          <button onClick={postBeReal} className="post-button">
            Post BeReal
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="camera-container">
      <div className="camera-header">
        <button onClick={goBack} className="camera-nav-button">
          <X size={24} />
        </button>
        <div className="camera-title">
          <h2>{currentCamera === 'back' ? 'Take the back photo' : 'Now the front photo!'}</h2>
          {backPhoto && <p>Perfect! Now capture the front.</p>}
        </div>
      </div>

      <div className="camera-viewfinder">
        {countdown !== null && (
          <div className="countdown-overlay">
            <Timer size={48} />
            <span className="countdown-number">{countdown}</span>
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-video"
        />
        
        {backPhoto && currentCamera === 'front' && (
          <div className="back-photo-preview">
            <img src={backPhoto} alt="Back camera preview" />
          </div>
        )}
      </div>

      <div className="camera-controls">
        <div className="camera-control-item" />
        
        <button 
          onClick={() => {
            if (navigator.mediaDevices?.getUserMedia) {
              capturePhoto()
            } else {
              simulateCapture()
            }
          }}
          disabled={isCapturing}
          className={`capture-button ${isCapturing ? 'capturing' : ''}`}
        >
          <CameraIcon size={32} />
        </button>
        
        <button 
          onClick={() => setCurrentCamera(currentCamera === 'front' ? 'back' : 'front')}
          className="flip-button"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  )
}

export default Camera