import { Email, EmailCategory } from '@/types/email';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Paperclip,
  ChevronRight,
  Zap
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EmailListProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (email: Email) => void;
}

const categoryConfig: Record<EmailCategory, { label: string; color: string }> = {
  support: { label: 'Support', color: 'bg-info/20 text-info' },
  payment: { label: 'Payment', color: 'bg-success/20 text-success' },
  hr: { label: 'HR', color: 'bg-purple-500/20 text-purple-400' },
  meeting: { label: 'Meeting', color: 'bg-primary/20 text-primary' },
  complaint: { label: 'Complaint', color: 'bg-warning/20 text-warning' },
  spam: { label: 'Spam', color: 'bg-destructive/20 text-destructive' },
  general: { label: 'General', color: 'bg-muted text-muted-foreground' },
};

const priorityConfig = {
  high: { color: 'border-l-destructive', dot: 'bg-destructive' },
  medium: { color: 'border-l-warning', dot: 'bg-warning' },
  low: { color: 'border-l-muted-foreground', dot: 'bg-muted-foreground' },
};

export const EmailList = ({ emails, selectedId, onSelect }: EmailListProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {emails.map((email, index) => (
        <div
          key={email.id}
          onClick={() => onSelect(email)}
          className={cn(
            "email-row p-4 border-b border-border/30 fade-in",
            priorityConfig[email.priority].color,
            selectedId === email.id && "bg-secondary/70 border-l-primary",
            !email.read && "bg-secondary/30"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
              email.threatLevel === 'phishing' 
                ? "bg-destructive/20 text-destructive" 
                : "bg-primary/20 text-primary"
            )}>
              {email.threatLevel === 'phishing' ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                email.from.charAt(0).toUpperCase()
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "font-medium text-sm truncate",
                  !email.read ? "text-foreground" : "text-muted-foreground"
                )}>
                  {email.from}
                </span>
                {!email.read && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                )}
                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                  {formatDistanceToNow(email.timestamp, { addSuffix: true })}
                </span>
              </div>

              <h3 className={cn(
                "text-sm mb-1 truncate",
                !email.read ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {email.subject}
              </h3>

              <p className="text-xs text-muted-foreground truncate mb-2">
                {email.body.slice(0, 80)}...
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Category */}
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  categoryConfig[email.category].color
                )}>
                  {categoryConfig[email.category].label}
                </span>

                {/* Threat indicator */}
                {email.threatLevel !== 'safe' && (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1",
                    email.threatLevel === 'phishing' 
                      ? "bg-destructive/20 text-destructive"
                      : "bg-warning/20 text-warning"
                  )}>
                    <Shield className="w-3 h-3" />
                    {email.threatLevel === 'phishing' ? 'Phishing' : 'Suspicious'}
                  </span>
                )}

                {/* Actions available */}
                {email.detectedActions.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {email.detectedActions.length} Action{email.detectedActions.length > 1 ? 's' : ''}
                  </span>
                )}

                {/* Attachments */}
                {email.attachments && email.attachments.length > 0 && (
                  <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
