/* =============================================================
   PROJECTS
   =============================================================
   Empty by default -- the Portfolio page automatically shows a
   "Coming soon" empty state whenever this array is empty, and
   switches to the project grid the moment it has at least one
   entry. No other code needs to change.

   FIELD REFERENCE
   ---------------
   id                 unique string, used as the React key
   title              project name
   category           e.g. 'Web Development' / 'Android Development'
   year               shown as a small meta chip
   status             free text, e.g. 'Completed', 'In progress'
   isUnderDevelopment set true to show an "In progress" badge on the
                      card and in the modal -- for a project you're
                      actively building, not finished yet
   description        1-2 lines, shown on the card in the grid
   longDescription     array of paragraphs, shown in the modal
   features           array of bullet points, shown in the modal
   technologies        array of tech names, shown as tags
   image               path to a cover image in `public/projects/`
   github              repo URL -- leave '' to hide the Code button
   demo                live site URL -- leave '' to hide the Demo button

   EXAMPLE (copy this shape for each real project you add):
   {
     id: 'my-project',
     title: 'Project Name',
     category: 'Web Development',
     year: '2026',
     status: 'In progress',
     isUnderDevelopment: true,
     description: 'One or two sentences shown on the card.',
     longDescription: [
       'A longer paragraph explaining what the project is and does.',
       'Another paragraph on your role, the biggest challenge, or what you learned.',
     ],
     features: [
       'A key feature',
       'Another key feature',
     ],
     technologies: ['PHP', 'MySQL'],
     image: '/projects/my-project.png',
     github: 'https://github.com/yourusername/my-project',
     demo: '', // leave empty if there's no live demo yet
   },
   ============================================================= */

export const projects = [
      {
        id: 'familist',
        title: 'To-Do-List with score system',
        category: 'Web Development',
        year: '',
        status: '',
        isUnderDevelopment: false,
        description:
          'A to-do-list web application with a scoring system to gamify task completion.',
        longDescription: [
          'Familist is a To-Do List application designed to simplify task management. It integrates a system of points, achievements, and leaderboards to boost motivation',    ],
        features: [
          'Registration flow with form validation',
          'Event listing with search and category filters',
          'scoring system that rewards users for completing tasks',
          'leaderboard to encourage friendly competition among users',
        ],
        technologies: ['LARAVEL', 'MySQL', 'JAVASCRIPT', 'TAILWIND'],
        image: '/projects/familist.png',
        github: 'https://github.com/faidzabdl/Familist',
      },
      {
        id: 'mobile',
        title: 'Herbicom invoice app',
        category: 'Mobile Development',
        year: '2024',
        status: '',
        isUnderDevelopment: false,
        description:
          'A mobile application for managing invoices, built with Kotlin.',
        longDescription: [
          'Herbicom is a mobile application designed to streamline the process of managing invoices. Developed using Kotlin, it offers features such as invoice creation, tracking, and reporting, making it easier for businesses to handle their billing processes efficiently.',
        ],
        features: [
          'Login and registration system with secure authentication',
          'fingerprint authentication for added security',
          'dashbord for reporting and tracking invoices',
          'all data invoice with duration service and total price',
          'input data invoice with item list', 
        ],
        technologies: ['Kotlin', 'Android Studio', 'Firebase'],
        image: '/projects/android.jpeg',
      },
      {
        id: 'turnbased-game',
        title: 'Simple Turn-Based Game',
        category: 'Game Development',
        year: '',
        status: '',
        isUnderDevelopment: true,
        description:
          'A simple turn-based game implemented in Godot engine.',
        longDescription: [
          'This project is a simple turn-based game developed using the Godot engine. It serves as a learning exercise to understand game mechanics, turn-based logic, and basic AI implementation.',
        ],
        features: [
          'Basic turn-based combat system',
          'shop system for purchasing items',
          'dialog system for character interactions',
          'patroling system for npc',
          'simple menu and UI elements', 
        ],
        technologies: ['Godot', 'GDScript'],
        image: '/projects/turnbased.png',
        github: 'https://github.com/faidzabdl/projek_belajar_godot',
      },
      {
        id: 'web',
        title: 'Simple web clone imdb',
        category: 'Web Development',
        year: '2024',
        status: '',
        isUnderDevelopment: true,
        description:
          'A simple web clone of IMDb, built with next.js and Tailwind CSS.',
        longDescription: [
          'This is a simple web clone of IMDb, built with next.js, Tailwind CSS and using ombd API. It allows users to browse movies, view details, and search for their favorite films.',
        ],
        features: [
          'search movies',
          'movie details',
          'movies in this year', 
        ],
        technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'API'],
        image: '/projects/imdb_clone.png',
      },
]
