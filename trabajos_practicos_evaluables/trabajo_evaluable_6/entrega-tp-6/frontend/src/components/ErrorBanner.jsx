const ErrorBanner = ({ mensaje }) => {
  if (!mensaje) return null
  return (
    <div className="error-banner" role="alert" aria-live="polite">
      <span className="error-banner__icon">⚠️</span>
      <p className="error-banner__text">{mensaje}</p>
    </div>
  )
}

export default ErrorBanner
