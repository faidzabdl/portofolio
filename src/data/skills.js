// Add a new skill by adding an object to this array -- the Skills carousel
// picks it up automatically, no component changes needed.
//
// `icon` is a lucide-react icon component (imported below). Browse icons at
// https://lucide.dev/icons and import whichever fits each new skill.
import { FileCode2, Code2, Terminal, Smartphone, Cpu, GitBranch, Github, Gamepad2, Globe } from 'lucide-react'

export const skills = [
  {
    name: 'PHP',
    category: 'Language',
    description: 'Server-side scripting language for modern web application backend logic.',
    icon: Code2,
  },
  {
    name: 'JavaScript',
    category: 'Language',
    description: 'Core web language for interactive and dynamic front-end behavior.',
    icon: Terminal,
  },
  {
    name: 'Kotlin',
    category: 'Language',
    description: 'Modern programming language used for native Android development.',
    icon: Smartphone,
  },
  {
    name: 'Laravel',
    category: 'Framework',
    description: 'PHP web framework for building structured backend services and APIs.',
    icon: Cpu,
  },
  {
    name: 'Git',
    category: 'Version Control',
    description: 'Distributed version control system for tracking source code changes.',
    icon: GitBranch,
  },
  {
    name: 'GitHub',
    category: 'Platform',
    description: 'Cloud platform for code hosting, collaboration, and repository management.',
    icon: Github,
  },
  {
    name: 'Godot Engine',
    category: 'Game Engine',
    description: 'Open-source game engine for building 2D and 3D interactive projects.',
    icon: Gamepad2,
  },
  {
    name: 'Next.js',
    category: 'Framework',
    description: 'React framework for server-rendered web applications and static sites.',
    icon: Globe,
  },

  // Example of how to add more later:
  // {
  //   name: 'JavaScript',
  //   category: 'Programming Language',
  //   description: 'Short description of where you are with it.',
  //   icon: SomeIconFromLucide,
  // },
]
