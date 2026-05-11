// Archivo: src/components/SocialIcon.jsx

export function SocialIcon({ icon, label, className = '' }) {
  const assetMap = {
    GH: 'github',
    IG: 'instagram',
    X: 'x',
    YT: 'youtube',
  }

  const fileName = assetMap[icon] || assetMap[label] || (icon || label || 'link').toLowerCase()
  const src = `/assets/${fileName}.svg`

  return (
    <img
      src={src}
      alt={label || icon || 'social icon'}
      className={`w-5 h-5 ${className}`}
      loading="lazy"
    />
  )
}
