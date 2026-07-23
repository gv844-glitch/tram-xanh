export type CategoryId = 
  | 'trang-chu'
  | 'tin-tuc'
  | 'song-xanh'
  | 'cong-nghe-xanh'
  | 'cau-chuyen-xanh'
  | 'su-kien'
  | 'ai-tram-truong'
  | 'gioi-thieu'
  | 'lien-he';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  badgeCount?: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: CategoryId;
  categoryName: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  slug?: string;
}

export interface GreenEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  organizer: string;
  imageUrl: string;
  description: string;
  participantsCount: number;
}
