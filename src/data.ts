export const profile = {
  name: 'Sunil Paudel',
  role: 'Civil Engineer',
  location: 'Tokha-11, Kathmandu, Nepal',
  email: 'sunil.paudel3383@gmail.com',
  phone: '+977 9862583383',
  linkedin: 'https://www.linkedin.com/in/sunil-paudel121/',
  facebook: 'https://facebook.com/sunil.paudel121',
  image: '/sunil.png',
  summary:
    'Motivated and detail-oriented registered Civil Engineer with a strong academic record and practical experience gained through active involvement in professional organizations and student clubs. Highly proficient in engineering and design software, with a strong ability to adapt to new tools and technologies. Known for strong analytical thinking, effective teamwork, and a readiness to contribute to real-world engineering challenges.',
}

export const stats = [
  { value: 'NEC License No. 93806', label: 'Nepal Engineering Council' },
  { value: '3', label: 'Research Publications' },
  { value: '3+', label: 'Years of Involvement' },
  { value: 'IOE', label: 'Thapathali Campus' },
]

export const education = [
  {
    period: '2020 – 2024',
    title: "Bachelor's in Civil Engineering",
    place: 'Institute of Engineering, Thapathali Campus',
    detail: '75.89%',
  },
  {
    period: '2018 – 2020',
    title: '+2 / Science',
    place: 'Fluorescent Secondary School — NEB Board',
    detail: 'Grade: 3.79 / 4',
  },
  {
    period: '2018',
    title: 'SEE',
    place: 'Fluorescent Secondary School — NEB Board',
    detail: 'Grade: 3.90 / 4',
  },
]

export const experience = [
  {
    role: 'Civil Engineer',
    org: 'Aron Engineering Consultancy Pvt. Ltd.',
    period: 'Jul 2026 – Present',
    points: [
      'Design timber (wooden) deck systems, ensuring structural safety, stability, and compliance with engineering standards.',
      'Prepare detailed structural drawings and construction documentation to support project execution.',
    ],
  },
  {
    role: 'Surveyor — Municipal Transport Master Plan',
    org: 'Godawari Municipality, Lalitpur',
    period: '2026',
    points: [
      'Conducted field surveys of all municipal road networks, collecting spatial and condition data for transport planning.',
      'Organized and facilitated ward-level stakeholder meetings with residents and professionals to gather planning inputs.',
    ],
  },
  {
    role: 'Civil Engineer',
    org: 'Impulse Consultants Pvt. Ltd.',
    period: 'May 2025 – July 2025',
    points: [
      'Drafted bridge drawings with precision.',
      'Estimated project costs for budgeting.',
      'Prepared detailed project reports.',
      'Visited sites for culvert design oversight.',
    ],
  },
]

export interface ProjectImage {
  url: string
  caption: string
  alt: string
}

export interface ProjectItem {
  title: string
  tag: string
  images: ProjectImage[]
  points: string[]
}

export const projects: ProjectItem[] = [
  {
    title: 'Prestressed Concrete Box Girder Bridge',
    tag: 'Final Year Project',
    images: [
      {
        url: '/box girder.webp',
        caption: 'Box Girder Structural Model',
        alt: 'Prestressed Concrete Box Girder Bridge Model',
      },
      {
        url: '/bridge GA.png',
        caption: 'General Arrangement',
        alt: 'Bridge General Arrangement Drawing',
      },
      {
        url: '/members.jpg',
        caption: 'Final Year Project Team',
        alt: 'Final Year Project Team Members',
      },
    ],
    points: [
      'Designed various bridge components and performed hydrological and hydraulic analysis.',
      'Conducted site surveys and contributed to a project funded by the Local Roads Bridge Program (LRBP).',
      'Published research on limit state design for seismically active hilly river crossings in JIEE.',
    ],
  },
  {
    title: 'Model of a Tensegrity Bridge',
    tag: 'Inter-College Model Competition',
    images: [
      {
        url: '/tensegrity bridge.jpeg',
        caption: 'Scaled Tensegrity Bridge Structural Model',
        alt: 'Scaled tensegrity bridge model built for the competition',
      },
      {
        url: '/tensegrity team.jpeg',
        caption: 'Tensegrity Model Design & Competition Team',
        alt: 'Tensegrity Bridge Project Team',
      },
    ],
    points: [
      'Built a scaled-down model of an innovative tensegrity bridge structure.',
      'Secured 1st prize at the intra-college competition and 3rd prize nationally at the “Yathartha” TechFest.',
    ],
  },
  {
    title: 'Model of an Activated Sludge Wastewater Treatment Plant',
    tag: 'Inter-College Model Competition',
    images: [
      {
        url: '/aswwwtp team.JPG',
        caption: 'ASWWTP Model Competition Team & Demonstration',
        alt: 'Activated Sludge Wastewater Treatment Plant Team',
      },
    ],
    points: [
      'Built a scaled down model of an Activated Sludge Waste Water Treatment Plant.',
      'Engineered physical aeration, clarification, and biological treatment recirculation units for demonstration.',
    ],
  },
]

export const skills = {
  Technical: [
    'AutoCAD',
    'ETABS',
    'RISA 3D',
    'Python',
    'OpenSees',
    'Arc-GIS',
    'Advanced Excel with VBA',
    'Microsoft Office',
  ],
  Interpersonal: [
    'Communication',
    'Teamwork',
    'Time Management',
    'Problem-Solving',
    'Adaptability',
  ],
  Languages: [
    'Nepali',
    'English',
    'Hindi',
  ],
}

export interface TechnicalSkillDetail {
  name: string
  category: string
  level: string
  score: number
  maxScore: number
  description: string
}

export const technicalSkillDetails: Record<string, TechnicalSkillDetail> = {
  AutoCAD: {
    name: 'AutoCAD',
    category: 'Drafting & 2D/3D Design',
    level: 'Advanced',
    score: 8,
    maxScore: 10,
    description:
      'Structural drafting, detailing of bridge components, general arrangement (GA) drawings, and municipal plan preparation.',
  },
  ETABS: {
    name: 'ETABS',
    category: 'Structural Analysis & Design',
    level: 'Proficient',
    score: 6,
    maxScore: 10,
    description:
      '3D building structural modeling, dynamic & seismic response spectrum analysis, non-linear time history analysis, and frame design.',
  },
  'RISA 3D': {
    name: 'RISA 3D',
    category: 'Structural Analysis & Design',
    level: 'Intermediate',
    score: 4,
    maxScore: 10,
    description:
      'Basic structural analysis and design of 3D frame systems, trusses, and individual structural elements.',
  },
  Python: {
    name: 'Python',
    category: 'Programming & Engineering Analytics',
    level: 'Intermediate',
    score: 4,
    maxScore: 10,
    description:
      'Engineering data visualization, scientific plotting, optimization models, with proficiency in Seaborn and PuLP libraries.',
  },
  OpenSees: {
    name: 'OpenSees',
    category: 'Analysis & Research',
    level: 'Proficient',
    score: 8,
    maxScore: 10,
    description:
      'Non-linear structural response analysis & finite element framework research for earthquake engineering.',
  },
  'Arc-GIS': {
    name: 'Arc-GIS',
    category: 'GIS & Spatial Mapping',
    level: 'Proficient',
    score: 8,
    maxScore: 10,
    description:
      'Spatial analysis, municipal road network mapping, catchment area delineation, and topographic data visualization.',
  },
  'Advanced Excel with VBA': {
    name: 'Advanced Excel with VBA',
    category: 'Data Analysis & Automation',
    level: 'Proficient',
    score: 7,
    maxScore: 10,
    description:
      'Automated bridge design spreadsheets, engineering calculation templates, macro routines, and custom VBA scripting.',
  },
  'Microsoft Office': {
    name: 'Microsoft Office',
    category: 'Documentation & Reporting',
    level: 'Expert',
    score: 9,
    maxScore: 10,
    description:
      'Preparation of detailed engineering project reports, survey summaries, technical presentations, and documentation.',
  },
}

export const publications = [
  {
    title:
      'Limit State Design of a Single-Span PSC Box Girder Bridge for a Seismically Active Hilly River Crossing: Case Study of the Mardi River, Nepal',
    venue: 'Journal of Innovations in Engineering Education, 8(1)',
    href: 'https://doi.org/10.3126/jiee.v8i1.82601',
    year: '2025',
    type: 'Journal Paper',
    image: '/jiee.png',
  },
  {
    title: 'A Refreshers Manual on Concrete Technology',
    venue: 'New Lumbini Stationery',
    href: '',
    year: '2025',
    type: 'Reference Manual',
    image: '/Concrete Technology.jpeg',
  },
  {
    title: 'A Refreshers Manual on Engineering Hydrology',
    venue: 'New Lumbini Stationery',
    href: '',
    year: '2026',
    type: 'Reference Manual',
    image: '/Engineering Hydrology.JPG',
  },
]

export const leadership = [
  {
    role: 'President',
    org: 'Fluorescent Alumni Association',
    period: '2025 – Present',
    detail:
      'Lead operations and strategic initiatives, coordinating programs and strengthening alumni engagement across the Kathmandu Valley.',
  },
  {
    role: 'Secretary',
    org: 'Fluorescent Alumni Association',
    period: '2023 – 2025',
    detail:
      'Coordinated meetings and records, and supported community service projects, networking events, and fundraising initiatives.',
  },
  {
    role: 'Facilitator',
    org: "Civil Engineering Student's Society, Thapathali Campus",
    period: '2024 – 2025',
    detail:
      'Contributed ideas to event planning and designed graphic materials for social media, posters, and event branding.',
  },
  {
    role: 'Editor',
    org: 'Civil Transcend III',
    period: '2024',
    detail:
      'Edited and proofread content for clarity and consistency, collaborating on layout, typography, and magazine design.',
  },
  {
    role: 'Organizer',
    org: 'Yathartha 2.0 — National Tech Fest',
    period: '2024',
    detail:
      'Planned multiple technical and non-technical events and coordinated the first “Samadhan Makerthon: From Ideas to Solutions”.',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Trainings', href: '#trainings' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export interface Certificate {
  id: string
  title: string
  image: string
  caption: string
  issuer: string
  date: string
}

export const certificatesData: Certificate[] = [
  {
  id: 'cert-01',
  title: 'CESS, Thapathali Campus – Facilitator',
  image: '/CESS Facilitator.jpg',
  caption: 'Recognized for outstanding service as a Facilitator, contributing to academic activities and student engagement during the 2024–2025 tenure.',
  issuer: 'Civil Engineering Students’ Society (CESS), Thapathali Campus',
  date: '2025',
},
{
  id: 'cert-02',
  title: 'Civil Transcend III – Article Contributor',
  image: '/Civil Transcend Article.jpg',
  caption: 'Honored for authoring two technical articles on Sustainable Urban Drainage Systems (SuDS) and Tensegrity Structures, published in Civil Transcend III.',
  issuer: 'Civil Engineering Students’ Society (CESS), Thapathali Campus',
  date: '2025',
},
{
  id: 'cert-03',
  title: 'Civil Transcend III – Editor',
  image: '/Civil Transcend Editor.jpg',
  caption: 'Awarded for editorial contributions and dedication to the successful publication of Civil Transcend Issue III.',
  issuer: 'Civil Engineering Students’ Society (CESS), Thapathali Campus',
  date: '2025',
},
{
  id: 'cert-04',
  title: 'Inter-House Nepali Essay Writing Competition – First Position',
  image: '/First- Nepali Essay(Secondary).jpg',
  caption: 'Secured First Position in the Inter-House Nepali Essay Writing Competition, demonstrating excellence in creative and analytical writing.',
  issuer: 'Fluorescent Higher Secondary School',
  date: '2072 BS',
},
{
  id: 'cert-05',
  title: 'World Environment Day Speech Competition – First Position',
  image: '/First- Speech Competition Tokha.jpg',
  caption: 'Achieved First Position in a speech competition organized on the occasion of World Environment Day, promoting environmental awareness.',
  issuer: 'Tokha Municipality',
  date: '2078 BS',
},
{
  id: 'cert-06',
  title: 'District-Level Speech Competition – First Position',
  image: '/First- Speech COmpetition.jpg',
  caption: 'Won First Position in a district-level public speaking competition during the Teej Festival, showcasing effective communication skills.',
  issuer: 'Radio Didi Bahini 95.2 MHz',
  date: '2079 BS',
},
{
  id: 'cert-07',
  title: 'Yathartha 2080 – Intra College Model Competition',
  image: '/First-Intra college model.jpg',
  caption: 'Secured First Position in the Intra College Model Competition with an innovative engineering model presented at Yathartha 2080.',
  issuer: 'CESS & Free Student Union, Thapathali Campus',
  date: '2080 BS',
},
{
  id: 'cert-08',
  title: 'Intra-School Nepali Essay Competition – First Position',
  image: '/First-Nepali Essay Writing.jpg',
  caption: 'Earned First Position in an intra-school Nepali Essay Competition for exceptional writing and critical thinking.',
  issuer: 'Fluorescent Secondary School',
  date: '2075 BS',
},
  {
    id: 'cert-09',
    title: 'Samadhan Makerthon Coordinator',
    image: '/Samadhan Makerthon COordinator.jpg',
    caption: 'Recognized as a Coordinator for successfully organizing the "Samadhan Makerthon – From Ideas to Solution", a pre-event of Yathartha 2081, demonstrating leadership, event management, and teamwork.',
    issuer: 'CESS-Thapathali Campus & Free Student Union (FSU), IOE Thapathali Campus',
    date: '2081 BS'
  },

  {
    id: 'cert-10',
    title: 'School Fete & Exhibition 2017 – Computer Application Support',
    image: '/School Fete.jpg',
    caption: 'Awarded for contributing to the successful organization of the School Fete & Exhibition 2017 by supporting the Computer Application event.',
    issuer: 'Fluorescent Secondary School',
    date: '2073 BS'
  },

  {
    id: 'cert-11',
    title: 'School Fete & Exhibition 2019 – Science Exhibition & Anchoring',
    image: '/Science Exhibition and Anchoring.jpg',
    caption: 'Recognized for organizing the Science Exhibition and serving as an event anchor during the School Fete & Exhibition 2019.',
    issuer: 'Fluorescent Secondary School',
    date: '2075 BS'
  },

  {
    id: 'cert-12',
    title: 'District-Level Teej Speech Competition – Second Position',
    image: '/Second_Speech COmpetition.jpg',
    caption: 'Second Position in a district-level public speaking competition, showcasing effective communication and public speaking skills.',
    issuer: 'Radio Didi Bahini 95.2 MHz',
    date: '2079 BS'
  },

  {
    id: 'cert-13',
    title: 'Basketball Tournament – Second Position',
    image: '/Second-Basketball.jpg',
    caption: 'Secured Second Position in the inter-house basketball competition, demonstrating teamwork, sportsmanship, and leadership.',
    issuer: 'Fluorescent Secondary School',
    date: '2075 BS'
  },

  {
    id: 'cert-14',
    title: 'Football Tournament – Second Position',
    image: '/Second-Football.jpg',
    caption: 'Achieved Second Position in the inter-house football tournament, reflecting teamwork, discipline, and competitive spirit.',
    issuer: 'Fluorescent Secondary School',
    date: '2075 BS'
  },

  {
    id: 'cert-15',
    title: 'Inter College Model Competition – Third Position',
    image: '/Third-Intra College Model Competition.jpg',
    caption: 'Awarded Third Position in the Inter College Model Competition during Yathartha 2080 for creativity, technical knowledge, and innovative presentation.',
    issuer: 'CESS-Thapathali Campus & FSU, IOE Thapathali Campus',
    date: '2080 BS'
  },

  {
    id: 'cert-16',
    title: 'Inter College Quiz Competition – Third Position',
    image: '/Third-Quiz Competition.jpg',
    caption: 'Secured Third Position in the national-level Quiz Contest organized during UTSARGA 2079.',
    issuer: 'CESS & ASIS, IOE Thapathali Campus',
    date: '2079 BS'
  },

  {
    id: 'cert-17',
    title: 'Parents Day & School Fete 2018 – Volunteer',
    image: '/Volunteer.jpg',
    caption: 'Recognized for outstanding volunteer service in organizing the 21st Parents Day cum School Fete 2018.',
    issuer: 'Fluorescent Secondary School',
    date: '2074 BS'
  },

  {
    id: 'cert-18',
    title: 'Nepali Speech Competition – First Position',
    image: '/First-Nepali Speech Fluorescent.jpg',
    caption: 'Won First Position in the Intra-School Nepali Language Speech Competition.',
    issuer: 'Fluorescent Secondary School',
    date: '2017'
  },
  {
    id: 'cert-19',
    title: 'Lifetime Membership',
    image: '/Fluorescent Alumni Association Life time.jpg',
    caption: 'Awarded Lifetime Membership in recognition of continued contribution and commitment to the Fluorescent Alumni Association.',
    issuer: 'Fluorescent Alumni Association',
    date: '2025'
  },
  {
    id: 'cert-20',
    title: 'Token of Love',
    image: '/Fluorescent Token of Love.jpg',
    caption: 'Received a Token of Love in appreciation of winning Speech Competition in Tokha Municipality.',
    issuer: 'Fluorescent Secondary School',
    date: '2025'
  },
  {
    id: 'cert-21',
    title: 'Best Final Year Project Presentation',
    image: '/Graduate Conference.jpg',
    caption: 'Recognized for presenting one of the best final-year civil engineering projects at the 3rd Thapathali Graduate Conference.',
    issuer: 'IOE Thapathali Campus',
    date: '2025'
  },
]


export const trainingsAndWorkshops = {
  attended: [
    {
      id: 'attended-1',
      title: 'Capacity Building Event on Road Slope Stability and Bio-Engineering',
      org: 'Organized by Asian Development Bank (ADB) & DOLI',
      support: 'In support with SWN and TRL',
      certificate: '/ADB.png',
      certificateName: 'ADB Certificate',
    },
    {
      id: 'attended-2',
      title: 'Hydropower and Sustainable Energy Session',
      org: 'Junction X, Kathmandu',
    },
    {
      id: 'attended-3',
      title: 'Advanced Excel Course with VBA',
      org: 'Organized by CESS, Thapathali Campus',
      certificate: '/Microsoft Package.jpg',
      certificateName: 'Advanced Excel Course',
    },
    {
      id: 'attended-4',
      title: 'Microsoft Office Course',
      org: 'Organized by Sikaune',
      certificate: '/Microsoft Package.jpg',
      certificateName: 'Microsoft Package',
    },
    {
      id: 'attended-5',
      title: 'Orientation on Professional Orientation and Career Empowerment',
      org: 'Organized by NEA and NEC',
      certificate: '/NEA.jpeg',
      certificateName: 'NEA Orientation Certificate',
    },
  ],
  conducted: [
    {
      id: 'conducted-1',
      title: 'Survey Camp Report Preparation Workshop',
      org: 'For juniors, Thapathali Campus — via CESS',
      role: 'Facilitator',
    },
    {
      id: 'conducted-2',
      title: 'Building Analysis and Design Workshop',
      org: 'Organized by CESS',
      role: 'Software instructor',
    },
    {
      id: 'conducted-3',
      title: 'Final Year Project Orientation',
      org: 'Thapathali Campus — via CESS',
      note: 'Shared experience and challenges faced during final year',
      role: 'Speaker',
    },
    {
      id: 'conducted-4',
      title: 'Survey Camp Report Preparation Workshop',
      org: 'Universal College of Engineering and Management',
      role: 'Software instructor',
    },
  ],
}

