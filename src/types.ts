export type Language = 'id' | 'en';

export interface Streamer {
  id: string;
  name: string;
  age: number;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  avatar: string;
  coverImage: string;
  viewers: number;
  category: 'dance' | 'music' | 'chat' | 'pk' | 'gaming' | 'cosplay';
  tags: string[];
  isLive: boolean;
  bioId: string;
  bioEn: string;
  followers: string;
  likes: number;
  level: number;
}

export interface FaqItem {
  id: string;
  questionId: string;
  answerId: string;
  questionEn: string;
  answerEn: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  country: string;
  flag: string;
  rating: number;
  textId: string;
  textEn: string;
  date: string;
  device: 'Android' | 'iPhone iOS';
  likesCount: number;
}

export interface ReferralTier {
  friendsRequired: number;
  coinsReward: number;
  vipStatus: string;
  bonusTitleId: string;
  bonusTitleEn: string;
  perkId: string;
  perkEn: string;
}
