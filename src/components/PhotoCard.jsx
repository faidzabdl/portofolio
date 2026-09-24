import { Image as ImageIcon } from 'lucide-react'

export default function PhotoCard({ src, alt, label = 'profile.jpg', className = '' }) {
  return (
    <figure className={`photo-card ${className}`}>
      <span className="photo-card-tab">
        <ImageIcon size={12} strokeWidth={1.75} aria-hidden="true" />
        {label}
      </span>
      <div className="photo-card-frame">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </figure>
  )
}
