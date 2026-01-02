export type FilterType = 'email' | 'subject' | 'both';

export interface EmailFilter {
  id: string;
  filterType: FilterType;
  emailAddress?: string;
  subjectKeyword?: string;
  chatgptPrompt: string;
  enabled: boolean;
}

export interface GmailSettings {
  connected: boolean;
  email?: string;
  checkIntervalSeconds: number;
  daysToLookBack: number;
  autoReplyEnabled: boolean;
  filters: EmailFilter[];
}
