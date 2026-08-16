import { defaultLabels, uid, type CvData } from './types'

/**
 * Sunil Paudel's CV, used as the "Load example" content so visitors can see how
 * each field maps onto the template before replacing it with their own details.
 */
export const sampleCv = (): CvData => ({
  name: 'Sunil Paudel',
  contacts: [
    {
      id: uid(),
      type: 'linkedin',
      text: 'Sunil Paudel',
      url: 'https://www.linkedin.com/in/sunil-paudel121/',
    },
    { id: uid(), type: 'email', text: 'sunil.paudel3383@gmail.com', url: '' },
    { id: uid(), type: 'phone', text: '+977 9862583383', url: '' },
    { id: uid(), type: 'location', text: 'Tokha-11, Kathmandu', url: '' },
  ],
  summary:
    'Motivated and detail-oriented registered Civil Engineer with a strong academic record and practical experience gained through active involvement in professional organizations and student clubs. Highly proficient in engineering and design software, with a strong ability to adapt to new tools and technologies. Known for strong analytical thinking, effective teamwork, and a readiness to contribute to real-world engineering challenges.',
  education: [
    {
      id: uid(),
      period: '2020 - 2024',
      degree: "Bachelor's in Civil Engineering",
      joiner: 'at',
      institution: 'Institute of Engineering, Thapathali Campus',
      detail: '75.89%',
    },
    {
      id: uid(),
      period: '2018 - 2020',
      degree: '+2/Science',
      joiner: 'at',
      institution: 'Fluorescent Secondary School through NEB Board',
      detail: 'Grade:- 3.79/4',
    },
    {
      id: uid(),
      period: '2018',
      degree: 'SEE',
      joiner: 'from',
      institution: 'Fluorescent Secondary School through NEB Board',
      detail: 'Grade:- 3.90/4',
    },
  ],
  experience: [
    {
      id: uid(),
      title: 'Aron Engineering Pvt. Ltd - Civil Engineer',
      meta: 'July 2026 - Present',
      twoColumns: false,
      bullets: [
        'Design timber (wooden) deck systems, ensuring structural safety, stability, and compliance with engineering standards.',
        'Prepare detailed structural drawings and construction documentation to support project execution.',
      ],
    },
    {
      id: uid(),
      title: 'Impulse Consultants Pvt. Ltd. - Civil Engineer',
      meta: 'May 2025 – July 2025',
      twoColumns: true,
      bullets: [
        'Drafted bridge drawings with precision.',
        'Estimated project costs for budgeting.',
        'Prepared detailed project reports.',
        'Visited sites for culvert design oversight.',
      ],
    },
    {
      id: uid(),
      title: 'A Complete Workshop on Building Analysis and Design – Tutor',
      meta: 'CESS, Thapathali Campus',
      twoColumns: false,
      bullets: [
        'Instructed comprehensive building analysis and design using AutoCAD and ETABS for residential projects.',
        'Prepared and taught municipal drawings for residential buildings, ensuring compliance with local standards.',
      ],
    },
    {
      id: uid(),
      title: 'Municipal Transport Master Plan- Surveyor',
      meta: 'Godawari Municipality, Lalitpur-2026',
      twoColumns: false,
      bullets: [
        'Conducted field surveys of all municipal road networks, collecting spatial and condition data for transport planning.',
        'Organized and facilitated ward-level stakeholder meetings involving local residents and professionals from multiple sectors to gather inputs for planning.',
      ],
    },
  ],
  projects: [
    {
      id: uid(),
      title: 'Analysis and Design of Prestressed Concrete Box Girder Bridge',
      meta: 'Final Year Project',
      twoColumns: false,
      bullets: [
        'Designed various bridge components and performed hydrological and hydraulic analysis.',
        'Conducted site surveys and contributed to a project funded by the Local Roads Bridge Program (LRBP).',
      ],
    },
  ],
  nonAcademic: [
    {
      id: uid(),
      title: 'Fluorescent Alumni Association:- President',
      meta: '2025–Present',
      twoColumns: false,
      bullets: [
        'Lead the overall operations and strategic initiatives of the Fluorescent Alumni Association, coordinating programs and strengthening alumni engagement.',
        "Oversee collaborations, events, and community-focused activities to expand the NGO's impact within the Kathmandu Valley.",
      ],
    },
    {
      id: uid(),
      title: "Civil Engineering Student's Society, Thapathali Campus – Facilitator",
      meta: '2024–2025',
      twoColumns: false,
      bullets: [
        'Contributed innovative ideas in the organization and planning of events and workshops.',
        'Designed graphic materials for social media, posters, and event branding.',
      ],
    },
    {
      id: uid(),
      title: 'Civil Transcend III – Editor',
      meta: '2024',
      twoColumns: false,
      bullets: [
        'Edited and proofread content for clarity, grammar, and consistency across articles and reports.',
        'Collaborated with the graphics designer on layout, typography, and overall magazine design.',
      ],
    },
    {
      id: uid(),
      title: 'Yathartha 2.0: A National Level Tech Fest – Organizer',
      meta: '2024',
      twoColumns: false,
      bullets: [
        "Played a key role in planning and structuring multiple technical and non-technical events, contributing to the fest's success.",
        'Organized the first edition of “Samadhan Makerthon: From Ideas to Solutions” as a coordinator.',
      ],
    },
  ],
  publications: [
    {
      id: uid(),
      title:
        'Limit State Design of a Single-Span PSC Box Girder Bridge for a Seismically Active Hilly River Crossing: Case Study of the Mardi River, Nepal.',
      detail:
        'Journal of Innovations in Engineering Education, 8(1). https://doi.org/10.3126/jiee.v8i1.82601',
    },
    {
      id: uid(),
      title:
        'Seismic Fragility Analysis of Residential RC Buildings in Kathmandu Valley built before the Gorkha Earthquake 2015 with Retrofitting Interventions',
      detail: ':- Research Paper Under Review',
    },
    {
      id: uid(),
      title:
        'Compounded Impacts of Rapid Urbanization and Climate Change on Flood Susceptibility and Groundwater Dynamics in Kathmandu Valley',
      detail: ':- Review Article Under Review',
    },
    {
      id: uid(),
      title: 'A Refreshers Manual on Concrete Technology.',
      detail: 'New Lumbini Stationary, 2025',
    },
    {
      id: uid(),
      title: 'A Refreshers manual on Engineering Hydrology.',
      detail: 'New Lumbini Stationery, 2026',
    },
  ],
  skillsTechnical: [
    'AutoCAD',
    'ETABS',
    'Microsoft Office',
    'Arc-GIS',
    'Opensees',
    'Advanced Excel with VBA',
  ],
  skillsInterpersonal: [
    'Communication',
    'Teamwork',
    'Time Management',
    'Problem-Solving',
    'Adaptability',
  ],
  languages: [
    'Nepali - Native',
    'English - Fluent (Speaking, Reading, Writing)',
    'Hindi - Conversational',
  ],
  references: [
    {
      id: uid(),
      name: 'Dr. Alin Chandra Shakya',
      detail:
        'Assistant Professor, Thapathali Campus, Institute of Engineering- Tribhuvan University, Email: ashakya@tcioe.edu.np, Phone: +977-9841323719.',
    },
    {
      id: uid(),
      name: 'Dr. Sujan Tripathi',
      detail:
        'Assistant Professor, Thapathali Campus, Institute of Engineering- Tribhuvan University, Email: sujantripathi@ioe.edu.np, Phone: +977-9851302087.',
    },
  ],
  labels: { ...defaultLabels },
})
