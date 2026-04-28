import { WebsiteConfig } from './types';

export const INITIAL_WEBSITE_CONFIG: WebsiteConfig = {
  header: {
    logo: 'https://img.icons8.com/stencil/100/monitor.png',
    title: 'Saathi Computer Institute',
    menu: [
      { label: 'Home', link: '#' },
      { label: 'Director', link: '#director' },
      { label: 'Branches', link: '#branches' },
      { label: 'About Us', link: '#about' },
      { label: 'Courses', link: '#courses' },
      { label: 'Why Choose Us', link: '#features' },
      { label: 'Gallery', link: '#gallery' },
      { label: 'Contact', link: '#contact' },
    ]
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      title: 'Empowering your future with practical computer education',
      subtitle: 'Join Saathi Computer Institute for career-focused training and technical excellence.',
      images: ['https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200'],
      ctaText: 'Enroll Now',
      ctaLink: '#contact',
      ctaAction: 'link',
      order: 0
    },
    {
      id: 'director-1',
      type: 'director-message',
      title: 'Director’s Message',
      subtitle: 'Mr. R. K. Tiwari',
      content: 'At Sakshi Computer Institute, our mission is to empower students with practical knowledge and industry-relevant skills. We focus on building strong foundations for a successful career in IT and computer education. With experienced faculty and modern infrastructure, we ensure quality education for every student.',
      images: ['https://images.unsplash.com/photo-1519085185758-26987a15998b?auto=format&fit=crop&q=80&w=800'],
      order: 0.2
    },
    {
      id: 'branches-1',
      type: 'branches',
      title: 'Our Branches',
      subtitle: 'Visit our nearest campus for admissions and inquiries.',
      content: 'Mohandra Branch: Saathi Computer Institute, Near Jain Mandir, Main Road Mohindra, Panna (M.P.)\n\nPawai Branch: Saathi Computer Institute, Near Bus Stand, Pawai, Panna (M.P.)',
      order: 0.3
    },
    {
      id: 'slider-1',
      type: 'slider',
      title: 'Our Modern Campus',
      subtitle: 'Experience world-class computer labs and facilities.',
      images: [
        'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1544652277-2f3b9c7b4169?auto=format&fit=crop&q=80&w=1200'
      ],
      order: 0.5
    },
    {
      id: 'about-1',
      type: 'about',
      title: 'Who We Are',
      subtitle: 'Saathi Computer Institute is dedicated to providing quality computer education that bridges the gap between academic knowledge and practical skills.',
      content: 'We are affiliated with Makhanlal Chaturvedi National University, ensuring recognized certifications and industry-relevant curriculum. Our goal is to create skilled professionals who are ready to excel in the digital and corporate world.',
      images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'],
      order: 1
    },
    {
      id: 'vision-1',
      type: 'custom',
      title: 'Mission & Vision',
      subtitle: 'Our purpose and our promise to the digital generation.',
      content: '### Our Mission\nTo deliver high-quality computer education that equips students with technical skills, confidence, and career readiness, enabling them to succeed in a competitive digital world.\n\n### Our Vision\nTo become a leading computer education institute known for excellence, innovation, and student success, while contributing to building a digitally empowered society.',
      order: 2
    },
    {
      id: 'features-1',
      type: 'custom',
      title: 'Why Choose Us?',
      subtitle: 'What makes us different from others.',
      content: '• Focus on practical learning\n• Career-oriented training programs\n• Supportive learning environment\n• Strong placement support\n• Modern computer lab with latest configuration systems\n• Individual system access for every student\n• English & Hindi medium teaching\n• Experienced and certified instructors\n• Free CPCT coaching\n• 100% Job Assistance\n• Personality development sessions\n• High-speed internet & power backup\n• Library with study room\n• CCTV secured campus',
      order: 3
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      title: 'Our Campus Gallery',
      subtitle: 'Take a look at our modern infrastructure and student life.',
      images: [
        'https://ais-pre-74v4txmhsomudyklbvdw5z-134852760448.asia-southeast1.run.app/api/artifacts/artifact_1714288633.png',
        'https://ais-pre-74v4txmhsomudyklbvdw5z-134852760448.asia-southeast1.run.app/api/artifacts/artifact_1714288634.png',
        'https://ais-pre-74v4txmhsomudyklbvdw5z-134852760448.asia-southeast1.run.app/api/artifacts/artifact_1714288635.png',
        'https://ais-pre-74v4txmhsomudyklbvdw5z-134852760448.asia-southeast1.run.app/api/artifacts/artifact_1714288636.png',
        'https://ais-pre-74v4txmhsomudyklbvdw5z-134852760448.asia-southeast1.run.app/api/artifacts/artifact_1714288637.png'
      ],
      order: 3.5
    },
    {
      id: 'courses-1',
      type: 'courses',
      title: 'Our Featured Courses',
      subtitle: 'Industry-relevant curriculum designed for your success.',
      order: 4
    },
    {
      id: 'contact-1',
      type: 'contact',
      title: 'Get in Touch',
      subtitle: 'We are here to guide you toward the right career path.',
      order: 5
    }
  ],
  footer: {
    about: 'Saathi Computer Institute (Affiliated with MCU). Empowerment through technical skill development since 2012.',
    contact: {
      phone: '+91 9926654640',
      email: 'info@saathicomputer.com',
      address: 'Saathi Computer Institute (ASI 6281), Mohindra, Panna (M.P.)'
    },
    branches: [
      {
        name: 'Pawai Branch',
        phones: ['9171654640', '9926654640', '9893883172'],
        address: 'Saathi Computer Institute, Near Bus Stand, Pawai, Panna (M.P.)',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Mohandra Branch',
        phones: ['8770542560', '9926654640', '9893883172'],
        address: 'Saathi Computer Institute, Near Jain Mandir, Main Road Mohindra, Panna (M.P.)',
        image: 'https://images.unsplash.com/photo-1544652277-2f3b9c7b4169?auto=format&fit=crop&q=80&w=600'
      }
    ]
  }
};
