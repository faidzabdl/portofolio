import { useState } from 'react'
import { Mail, Github, Linkedin, Instagram, Copy, Check } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { profile } from '../data/profile.js'

const channels = [
  {
    key: 'email',
    label: 'Email',
    icon: Mail,
    href: `mailto:${profile.socials.email}`,
    value: profile.socials.email,
    external: false,
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: Github,
    href: profile.socials.github,
    value: profile.socials.github.replace('https://', ''),
    external: true,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    href: profile.socials.linkedin,
    value: profile.socials.linkedin.replace('https://', ''),
    external: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    href: profile.socials.instagram,
    value: profile.socials.instagram.replace('https://', ''),
    external: true,
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.socials.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — the mailto card above still works fine.
    }
  }

  return (
    <div className="view view-contact">
      <PageHeader
        title="Let's Connect"
        lead="Have an idea, project, or just want to connect? Feel free to reach out."
      />

      <div className="contact-grid">
        {channels.map(({ key, label, icon: Icon, href, value, external }) => (
          <a
            className="contact-card"
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            key={key}
          >
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            <span className="contact-card-text">
              <span className="contact-card-label">{label}</span>
              <span className="contact-card-value">{value}</span>
            </span>
          </a>
        ))}
      </div>

      <button type="button" className="btn btn-ghost contact-copy-btn" onClick={handleCopyEmail}>
        {copied ? <Check size={15} strokeWidth={1.75} /> : <Copy size={15} strokeWidth={1.75} />}
        {copied ? 'Email copied' : 'Copy email address'}
      </button>

      {/*
        NOTE for Faidz: replace the placeholder values in src/data/profile.js
        (socials.email, socials.github, socials.linkedin, socials.instagram)
        with your real contact details. There's no backend wired up here on
        purpose — the email card uses a plain "mailto" link and the rest are
        outbound links, so nothing here pretends to submit a form.
      */}
    </div>
  )
}
