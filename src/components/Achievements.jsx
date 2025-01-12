import React from 'react'
import achievements from "../assets/achievements.png"
const Achievements = () => {
  return (
    <div className="mt-5">
    <div className="text-center mb-4">
      <h3 >Our Latest Achievement</h3>
    </div>
    <div className="text-center">
      <img 
        src={achievements} 
        className="img-fluid" 
        alt="Latest Achievement" 
        loading="lazy" 
        style={{ maxWidth: '80%', height: 'auto' }}
      />
    </div>
  </div>
  )
}

export default Achievements
