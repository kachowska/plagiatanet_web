
export interface Testimonial {
  avatarInitials: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CaseStudy {
    type: string;
    before: number;
    after: number;
    duration: string;
    review: string;
}

export interface Orderable {
  onOrderClick: () => void;
}

export interface Article {
  id: number;
  title: string;
  image: string;
  content: string;
  datePublished: string;
  author: {
    '@type': 'Organization' | 'Person';
    name: string;
  };
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  descriptionMeta: string;
  heroTitle: string;
  heroSubtitle: string;
}