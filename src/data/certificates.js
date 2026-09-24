/* =============================================================
   CERTIFICATES
   =============================================================
   Empty by default. The Skills page automatically shows a
   "Coming soon" empty state whenever this array is empty, and
   switches to the certificates carousel the moment it has at
   least one entry -- no other code needs to change.

   FIELD REFERENCE
   ---------------
   id             unique string, used as the React key
   title          certificate name
   issuer         who issued it, e.g. 'Dicoding', 'Google', your campus
   date           e.g. '2026' or 'March 2026'
   image          path to the certificate image in `public/certificates/`
   credentialUrl  verification / credential link -- leave '' or omit it
                  to hide the "View credential" button automatically

   EXAMPLE (copy this shape once you have a real certificate):
   {
     id: 'example-cert',
     title: 'Certificate Name',
     issuer: 'Issuing Organization',
     date: '2026',
     image: '/certificates/example-cert.png',
     credentialUrl: 'https://example.com/verify/xxxx',
   },
   ============================================================= */

export const certificates = [
  {
     id: 'IoT',
     title: 'Kidi IoT Case Study: Smart Home',
     issuer: 'Antares Telkom Indonesia',
     date: '2025',
     image: '/sertifikat_iot.jpg',
   },
]
