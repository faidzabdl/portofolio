export default function PageHeader({ title, lead }) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">{title}</h1>
      {lead && <p className="page-header-lead">{lead}</p>}
    </div>
  )
}
