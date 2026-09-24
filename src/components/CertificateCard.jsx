export default function CertificateCard({ certificate, onOpen }) {
  return (
    <button
      type="button"
      className="cert-card"
      onClick={() => onOpen(certificate)}
      aria-label={`View details for ${certificate.title}`}
    >
      <span className="cert-card-frame">
        <img src={certificate.image} alt="" aria-hidden="true" loading="lazy" />
      </span>
      <span className="cert-card-body">
        <span className="cert-card-title">{certificate.title}</span>
        <span className="cert-card-issuer">{certificate.issuer}</span>
      </span>
    </button>
  )
}
