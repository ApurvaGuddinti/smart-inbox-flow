export type EmailCategory = 'support' | 'payment' | 'hr' | 'meeting' | 'complaint' | 'spam' | 'general';
export type Priority = 'low' | 'medium' | 'high';
export type ThreatLevel = 'safe' | 'suspicious' | 'phishing';

export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
  category: EmailCategory;
  priority: Priority;
  threatLevel: ThreatLevel;
  threatScore: number;
  suggestedReply?: string;
  detectedActions: DetectedAction[];
  attachments?: string[];
}

export interface DetectedAction {
  type: 'meeting' | 'ticket' | 'invoice' | 'profile_update' | 'follow_up';
  description: string;
  data?: Record<string, string>;
}

export interface EmailStats {
  total: number;
  unread: number;
  byCategory: Record<EmailCategory, number>;
  threatCount: number;
  actionsPending: number;
}
