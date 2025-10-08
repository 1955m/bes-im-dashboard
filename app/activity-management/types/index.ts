export interface SelectOption {
  value: string | number;
  label: string;
}

export interface FormData {
  templateType: string;
  mediaType: string;
  language: string;
  title: string;
  content: string;
  exchangeRate: boolean;
  linkName: string;
  linkUrl: string;
  sort: string;
  initialViews: string;
  merchant: string;
  googleCode: string;
  scheduledPublish: boolean;
  publishTime: string;
  repeatRule: string;
  customRepeatType: string;
  customRepeatValue: number;
  customRepeatWeekdays: number[];
}

export interface Filters {
  searchTerm: string;
  language: string;
  template: string;
  status: string;
  merchant: string;
  isScheduled: string;
}

export interface TableRow {
  id: number;
  language: string;
  template: string;
  title: string;
  views: number;
  sort: number;
  merchant: string;
  createTime: string;
  updater: string;
  updateTime: string;
  status: 'published' | 'pending' | 'failed' | 'inactive';
  scheduledTime: string | null;
  errorMessage?: string;
}

export type PreviewMode = 'light' | 'dark';
