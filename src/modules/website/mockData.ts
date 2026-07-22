import { WebsiteConfig } from './types';

export const INITIAL_WEBSITE_CONFIG: WebsiteConfig = {
  header: {
    logo: 'https://img.icons8.com/stencil/100/monitor.png',
    title: 'Sakshi Computer Institute',
    menu: [
      { label: 'Home', link: '#' },
      { label: 'About', link: '#about' },
      { label: 'Courses', link: '#courses' },
      { label: 'Facilities', link: '#facilities' },
      { label: 'Admissions', link: '#admissions' },
      { label: 'Contact', link: '#contact' },
    ]
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      title: 'Empowering your future with practical computer education',
      subtitle: 'Join Sakshi Computer Institute for career-focused training and technical excellence.',
      images: ['https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200'],
      ctaText: 'Enroll Now',
      ctaLink: '#contact',
      ctaAction: 'link',
      order: 0
    },
    {
      id: 'why-us-1',
      type: 'why-us',
      title: 'What Makes Sakshi Different',
      subtitle: 'WHY CHOOSE US',
      order: 1
    },
    {
      id: 'facilities-1',
      type: 'facilities',
      title: 'Everything a Student Needs to Learn Well',
      subtitle: 'From a fully networked computer lab to free CPCT coaching, every facility is built around student success.',
      order: 2
    },
    {
      id: 'dca-pgdca-1',
      type: 'dca-pgdca',
      title: 'DCA & PGDCA — Regular Classes Running',
      subtitle: 'Both programs follow the curriculum of Makhanlal Chaturvedi University and are valid across all government job requirements.',
      order: 3
    },
    {
      id: 'director-1',
      type: 'director-message',
      title: 'Director’s Message',
      subtitle: 'Mr. Santosh Kushwaha',
      content: 'At Sakshi Computer Institute, our mission is to empower students with practical knowledge and industry-relevant skills. We focus on building strong foundations for a successful career in IT and computer education. With experienced faculty and modern infrastructure, we ensure quality education for every student.',
      images: ['https://images.unsplash.com/photo-1519085185758-26987a15998b?auto=format&fit=crop&q=80&w=800'],
      order: 4
    },
    {
      id: 'branches-1',
      type: 'branches',
      title: 'Our Branches',
      subtitle: 'Visit our nearest campus for admissions and inquiries.',
      content: 'Mohandra Branch: Sakshi Computer Institute, Near Jain Mandir, Main Road Mohindra, Panna (M.P.)\n\nPawai Branch: Sakshi Computer Institute, Near Bus Stand, Pawai, Panna (M.P.)',
      order: 5
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      title: 'Our Campus Gallery',
      subtitle: 'Take a look at our modern infrastructure and student life.',
      images: [
        'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1544652277-2f3b9c7b4169?auto=format&fit=crop&q=80&w=600'
      ],
      order: 6
    },
    {
      id: 'contact-1',
      type: 'contact',
      title: 'Get in Touch',
      subtitle: 'Visit us or reach out for admission and examination form assistance.',
      order: 7
    },
    {
      id: 'admissions-banner-1',
      type: 'admissions-banner',
      title: 'Admissions Are Now Open',
      order: 8
    }
  ],
  footer: {
    about: 'Sakshi Computer Institute (Affiliated with MCU). Empowerment through technical skill development since 2012.',
    contact: {
      phone: '+91 9926654640',
      email: 'info@sakshicomputer.com',
      address: 'Sakshi Computer Institute (ASI 6281), Mohindra, Panna (M.P.)'
    },
    branches: [
      {
        name: 'Pawai Branch',
        phones: ['9171654640', '9926654640', '9893883172'],
        address: 'Sakshi Computer Institute, Near Bus Stand, Pawai, Panna (M.P.)',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Mohandra Branch',
        phones: ['8770542560', '9926654640', '9893883172'],
        address: 'Sakshi Computer Institute, Near Jain Mandir, Main Road Mohindra, Panna (M.P.)',
        image: 'https://images.unsplash.com/photo-1544652277-2f3b9c7b4169?auto=format&fit=crop&q=80&w=600'
      }
    ],
    copyright: '© 2026 Sakshi Computer Institute. All rights reserved. Developed by Digital Communique Private Limited.'
  }
};
