import { Email, EmailStats } from '@/types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    from: 'Sarah Chen',
    fromEmail: 'sarah.chen@techcorp.com',
    subject: 'Urgent: Server Downtime - Immediate Action Required',
    body: 'Hi Team,\n\nWe are experiencing critical server issues affecting production. Please join the emergency call at 3 PM EST today.\n\nBest,\nSarah',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    category: 'support',
    priority: 'high',
    threatLevel: 'safe',
    threatScore: 5,
    suggestedReply: 'Hi Sarah,\n\nThank you for the alert. I will join the emergency call at 3 PM EST. In the meantime, I\'m reviewing the server logs.\n\nBest regards',
    detectedActions: [
      { type: 'meeting', description: 'Schedule emergency call', data: { time: '3 PM EST', date: 'Today' } }
    ]
  },
  {
    id: '2',
    from: 'Finance Department',
    fromEmail: 'finance@company.com',
    subject: 'Invoice #INV-2024-0892 - Payment Due',
    body: 'Dear Customer,\n\nPlease find attached invoice #INV-2024-0892 for $15,750.00. Payment is due within 30 days.\n\nThank you for your business.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    category: 'payment',
    priority: 'medium',
    threatLevel: 'safe',
    threatScore: 8,
    suggestedReply: 'Thank you for sending the invoice. We have received it and will process the payment within the specified timeframe.',
    detectedActions: [
      { type: 'invoice', description: 'Process invoice payment', data: { invoiceId: 'INV-2024-0892', amount: '$15,750.00' } }
    ],
    attachments: ['Invoice_2024_0892.pdf']
  },
  {
    id: '3',
    from: 'Unknown Sender',
    fromEmail: 'prince.nigeria@gmail-security.xyz',
    subject: 'CONGRATULATIONS! You Won $5,000,000!!!',
    body: 'Dear Lucky Winner,\n\nYou have been selected to receive $5,000,000. Click here immediately to claim your prize. Send your bank details now!\n\nPrince of Nigeria',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    category: 'spam',
    priority: 'low',
    threatLevel: 'phishing',
    threatScore: 95,
    detectedActions: []
  },
  {
    id: '4',
    from: 'HR Team',
    fromEmail: 'hr@company.com',
    subject: 'Annual Review Meeting - Please Confirm',
    body: 'Hello,\n\nYour annual performance review is scheduled for January 15th at 2:00 PM. Please confirm your availability.\n\nBest,\nHR Team',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    read: false,
    category: 'hr',
    priority: 'medium',
    threatLevel: 'safe',
    threatScore: 3,
    suggestedReply: 'Thank you for scheduling my annual review. I confirm my availability for January 15th at 2:00 PM.',
    detectedActions: [
      { type: 'meeting', description: 'Confirm review meeting', data: { date: 'January 15th', time: '2:00 PM' } }
    ]
  },
  {
    id: '5',
    from: 'Michael Torres',
    fromEmail: 'michael.t@clientco.com',
    subject: 'RE: Project Proposal - Need Changes',
    body: 'Hi,\n\nI reviewed the proposal and we need several modifications to the timeline. The deadline seems too aggressive. Can we discuss alternatives?\n\nThanks,\nMichael',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    read: true,
    category: 'general',
    priority: 'medium',
    threatLevel: 'safe',
    threatScore: 2,
    suggestedReply: 'Hi Michael,\n\nThank you for your feedback on the proposal. I understand your concerns about the timeline. I\'d be happy to schedule a call to discuss alternative approaches.\n\nBest regards',
    detectedActions: [
      { type: 'follow_up', description: 'Schedule timeline discussion' }
    ]
  },
  {
    id: '6',
    from: 'Account Security',
    fromEmail: 'security@amaz0n-verify.net',
    subject: 'Your account has been compromised - Verify Now',
    body: 'Dear User,\n\nWe detected suspicious activity on your account. Click the link below immediately to verify your identity or your account will be suspended.\n\nVerify: http://amaz0n-security.phishing.com/verify',
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    read: false,
    category: 'spam',
    priority: 'high',
    threatLevel: 'phishing',
    threatScore: 98,
    detectedActions: []
  },
  {
    id: '7',
    from: 'Emily Watson',
    fromEmail: 'emily.watson@partner.org',
    subject: 'Meeting Request: Q1 Strategy Planning',
    body: 'Hello,\n\nI would like to schedule a meeting to discuss our Q1 strategy alignment. Would Thursday at 10 AM work for you?\n\nLooking forward to hearing from you.\n\nEmily',
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    read: true,
    category: 'meeting',
    priority: 'medium',
    threatLevel: 'safe',
    threatScore: 4,
    suggestedReply: 'Hi Emily,\n\nThursday at 10 AM works perfectly for me. I\'ll send a calendar invite shortly.\n\nBest regards',
    detectedActions: [
      { type: 'meeting', description: 'Schedule Q1 strategy meeting', data: { day: 'Thursday', time: '10 AM' } }
    ]
  },
  {
    id: '8',
    from: 'Customer Support',
    fromEmail: 'support@techplatform.com',
    subject: 'Ticket #45892 - Unable to Login',
    body: 'Hello,\n\nI\'ve been trying to login to my account for the past 2 days but keep getting an error. I\'ve tried resetting my password but nothing works. Please help!\n\nUser ID: user_12345',
    timestamp: new Date(Date.now() - 1000 * 60 * 420),
    read: false,
    category: 'support',
    priority: 'high',
    threatLevel: 'safe',
    threatScore: 6,
    suggestedReply: 'Hello,\n\nThank you for contacting us. I apologize for the inconvenience you\'re experiencing. I\'m escalating your ticket to our technical team for immediate investigation. You should receive an update within 2 hours.\n\nBest regards',
    detectedActions: [
      { type: 'ticket', description: 'Create support ticket', data: { ticketId: '#45892', issue: 'Login failure' } }
    ]
  }
];

export const calculateStats = (emails: Email[]): EmailStats => {
  const byCategory = emails.reduce((acc, email) => {
    acc[email.category] = (acc[email.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: emails.length,
    unread: emails.filter(e => !e.read).length,
    byCategory: byCategory as any,
    threatCount: emails.filter(e => e.threatLevel !== 'safe').length,
    actionsPending: emails.reduce((acc, e) => acc + e.detectedActions.length, 0)
  };
};
