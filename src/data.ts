export const profile = {
  name: 'Sunil Paudel',
  role: 'Civil Engineer',
  location: 'Tokha-11, Kathmandu',
  email: 'sunil.paudel3383@gmail.com',
  phone: '+977 9862583383',
  linkedin: '#', // TODO: replace with your LinkedIn profile URL
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
        url: '/assets/tensegrity-bridge.jpg',
        caption: 'Scaled Tensegrity Bridge Structural Model',
        alt: 'Scaled tensegrity bridge model built for the competition',
      },
      {
        url: '/tensegrity-team.jpg',
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
    'Nepali — Native',
    'English — Fluent',
    'Hindi — Conversational',
  ],
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
    image: '/assets/concrete-technology.jpg',
  },
  {
    title: 'A Refreshers Manual on Engineering Hydrology',
    venue: 'New Lumbini Stationery',
    href: '',
    year: '2026',
    type: 'Reference Manual',
    image: '/assets/engineering-hydrology.jpg',
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
    title: 'Concrete Technology Training & Mix Verification',
    image: '/assets/concrete-technology.jpg',
    caption: 'Hands-on certification in concrete technology, non-destructive testing, and high-performance mix design.',
    issuer: 'Nepal Concrete Institute / IOE',
    date: '2023',
  },
  {
    id: 'cert-02',
    title: 'Engineering Hydrology & Water Resources Modeling',
    image: '/assets/engineering-hydrology.jpg',
    caption: 'Specialized training in hydro-meteorological data analysis, flood frequency estimation, and hydraulic modeling.',
    issuer: 'Department of Hydrology & Meteorology',
    date: '2024',
  },
  {
    id: 'cert-03',
    title: 'Journal of Innovation & Engineering Research',
    image: '/assets/journal-innovation.png',
    caption: 'Publication and recognition certificate for applied research in structural engineering and sustainable materials.',
    issuer: 'Journal of Innovation in Civil Engineering',
    date: '2024',
  },
  {
    id: 'cert-04',
    title: 'Tensegrity Bridge Design & Analysis Workshop',
    image: '/assets/tensegrity-bridge.jpg',
    caption: 'Certificate of completion for innovative cable-stayed and tensegrity structural model analysis.',
    issuer: 'CESS Thapathali Campus / Engineering Fest',
    date: '2024',
  },
  {
    id: 'cert-05',
    title: 'Girder Bridge Engineering & Substructure Analysis',
    image: '/assets/girder-bridge.jpg',
    caption: 'Certificate of excellence in RC T-girder bridge design, pier reinforcement, and load rating calculations.',
    issuer: 'Bridge Engineering Association',
    date: '2024',
  },
  {
    id: 'cert-06',
    title: 'Topographic Field Survey & GIS Mapping Certificate',
    image: '/assets/img5981.jpg',
    caption: 'Fieldwork credential for municipal transport survey, GPS data collection, and contour profiling.',
    issuer: 'Godawari Municipality / IOE',
    date: '2026',
  },
  {
    id: 'cert-07',
    title: 'Advanced Structural Analysis & ETABS Workshop',
    image: '/assets/img6079.jpg',
    caption: 'Mastery credential in 3D seismic modeling, dynamic analysis, and IS code compliance.',
    issuer: 'Civil Engineering Student’s Society',
    date: '2024',
  },
  {
    id: 'cert-08',
    title: 'Registered Civil Engineer Official License',
    image: '/assets/img-1c20.jpg',
    caption: 'Official NEC License (No. 93806) granting professional engineer authorization in Nepal.',
    issuer: 'Nepal Engineering Council',
    date: '2025',
  },
  {
    id: 'cert-09',
    title: 'Road Slope Stability & Bio-Engineering Capacity Building',
    image: '/ADB.png',
    caption: 'Capacity building certificate on slope stabilization, bio-engineering applications, and geotechnical resilience.',
    issuer: 'Asian Development Bank (ADB) & DOLI',
    date: '2025',
  },
  {
    id: 'cert-10',
    title: '10-Day Advanced Excel & VBA Course for Engineers',
    image: '/Advanced Excel Course.jpg',
    caption: 'Certificate of completion for 10-day intensive training in Advanced Excel, functions, data modeling, and VBA macros.',
    issuer: 'CESS, Thapathali Campus',
    date: '2024',
  },
  {
    id: 'cert-11',
    title: '7-Day Microsoft Office Package Workshop',
    image: '/Microsoft Package.jpg',
    caption: 'Certificate of completion for 7-day workshop on MS Word, MS Excel, PowerPoint, and office productivity tools.',
    issuer: 'CESS, Thapathali Campus',
    date: '2024',
  },
  {
    id: 'cert-12',
    title: 'Professional Orientation & Career Empowerment',
    image: '/NEA.jpeg',
    caption: 'Engineering orientation credential focusing on career development, professional ethics, and licensing standards.',
    issuer: 'Nepal Engineering Association (NEA) & NEC',
    date: '2025',
  },
  {
    id: 'cert-13',
    title: 'Certificate of Appreciation — Workshop Facilitator',
    image: '/CESS Facilitator.jpg',
    caption: 'Awarded in recognition of excellent work as Facilitator for software and academic workshops during 2024-2025.',
    issuer: 'CESS, Thapathali Campus',
    date: '2024 – 2025',
  },
  {
    id: 'cert-14',
    title: 'Technical Article Author — Civil Transcend Journal',
    image: '/Civil Transcend Article.jpg',
    caption: 'Recognition for publishing research article on "Sustainable Urban Drainage Systems (SuDS) for Flood Control in Urban Areas".',
    issuer: 'Civil Transcend / CESS Thapathali Campus',
    date: '2024',
  },
  {
    id: 'cert-15',
    title: 'Editorial Board Member & Editor — Civil Transcend Issue III',
    image: '/Civil Transcend Editor.jpg',
    caption: 'Certificate of appreciation bestowed in honor of excellent work as Editor for Civil Transcend Issue III.',
    issuer: 'Civil Transcend / CESS Thapathali Campus',
    date: '2024 – 2025',
  },
  {
    id: 'cert-16',
    title: '1st Position — Secondary Level Essay Writing Competition',
    image: '/First- Nepali Essay(Secondary).jpg',
    caption: 'First prize winner in competitive essay writing on socio-environmental development and engineering perspectives.',
    issuer: 'Secondary School Academic Committee',
    date: '2020',
  },
  {
    id: 'cert-17',
    title: '1st Position — Tokha Municipality Speech Competition',
    image: '/First- Speech Competition Tokha.jpg',
    caption: 'First position award in municipal public speaking and oratory competition organized by Tokha Municipality.',
    issuer: 'Tokha Municipality Academic Committee',
    date: '2020',
  },
  {
    id: 'cert-18',
    title: '3rd Position — Quiz Contest (UTSARGA National Fest)',
    image: '/Third-Quiz.jpg',
    caption: 'Merit award for securing 3rd position in the Quiz Contest under UTSARGA organized by CESS & ASIS Thapathali Campus.',
    issuer: 'CESS & ASIS, Thapathali Campus',
    date: '2023',
  },
  {
    id: 'cert-19',
    title: 'Certificate of Appreciation — Event Support & Volunteering',
    image: '/Volunteer.jpg',
    caption: 'Awarded for notable support and praiseworthy contribution to Parents Day and School Fete events.',
    issuer: 'Fluorescent School',
    date: '2018',
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
      certificate: '/Advanced Excel Course.jpg',
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

