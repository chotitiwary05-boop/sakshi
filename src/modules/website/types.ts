import { LucideIcon } from 'lucide-react';

export interface WebsiteSection {
  id: string;
  type: 'hero' | 'about' | 'courses' | 'contact' | 'custom' | 'slider' | 'gallery' | 'director-message' | 'branches';
  title: string;
  subtitle?: string;
  content?: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
  ctaAction?: 'link' | 'call' | 'map' | 'whatsapp' | 'email';
  order: number;
}

export interface WebsiteConfig {
  sections: WebsiteSection[];
  header: {
    logo?: string;
    title: string;
    menu: { label: string; link: string }[];
  };
  footer: {
    about: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    branches?: {
      name: string;
      phones: string[];
      address?: string;
      image?: string;
    }[];
  };
}
