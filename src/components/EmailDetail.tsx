import { Email } from '@/types/email';
import { Button } from '@/components/ui/button';
import { 
  Reply, 
  Forward, 
  Trash2, 
  Shield, 
  ShieldAlert,
  ShieldCheck,
  Zap,
  Calendar,
  FileText,
  User,
  Clock,
  Send,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EmailDetailProps {
  email: Email | null;
}

const actionIcons = {
  meeting: Calendar,
  ticket: FileText,
  invoice: FileText,
  profile_update: User,
  follow_up: Clock,
};

export const EmailDetail = ({ email }: EmailDetailProps) => {
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center glass-panel">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Email Selected</h3>
          <p className="text-sm text-muted-foreground">Select an email to view AI insights</p>
        </div>
      </div>
    );
  }

  const ThreatIcon = email.threatLevel === 'safe' 
    ? ShieldCheck 
    : email.threatLevel === 'suspicious' 
    ? Shield 
    : ShieldAlert;

  const threatColor = email.threatLevel === 'safe' 
    ? 'text-success' 
    : email.threatLevel === 'suspicious' 
    ? 'text-warning' 
    : 'text-destructive';

  return (
    <div className="flex-1 flex flex-col glass-panel overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold",
              email.threatLevel === 'phishing' 
                ? "bg-destructive/20 text-destructive" 
                : "bg-primary/20 text-primary"
            )}>
              {email.threatLevel === 'phishing' ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                email.from.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{email.from}</h2>
              <p className="text-sm text-muted-foreground">{email.fromEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Reply className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Forward className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-foreground mb-2">{email.subject}</h1>
        <p className="text-sm text-muted-foreground">
          {format(email.timestamp, 'MMMM d, yyyy at h:mm a')}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* AI Analysis Panel */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Security Score */}
          <div className={cn(
            "p-4 rounded-xl border",
            email.threatLevel === 'safe' 
              ? "bg-success/5 border-success/20" 
              : email.threatLevel === 'suspicious'
              ? "bg-warning/5 border-warning/20"
              : "bg-destructive/5 border-destructive/20"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <ThreatIcon className={cn("w-5 h-5", threatColor)} />
              <span className="text-sm font-medium text-foreground">Security Analysis</span>
            </div>
            <div className="flex items-end gap-2">
              <span className={cn("text-2xl font-bold", threatColor)}>
                {100 - email.threatScore}%
              </span>
              <span className="text-sm text-muted-foreground mb-1">Safe</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {email.threatLevel === 'safe' 
                ? 'No threats detected'
                : email.threatLevel === 'suspicious'
                ? 'Some suspicious elements found'
                : 'High risk of phishing detected'}
            </p>
          </div>

          {/* Priority */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Priority Level</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                email.priority === 'high' ? 'bg-destructive' :
                email.priority === 'medium' ? 'bg-warning' : 'bg-muted-foreground'
              )} />
              <span className="text-lg font-semibold text-foreground capitalize">
                {email.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Message</h3>
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
              {email.body}
            </p>
          </div>
        </div>

        {/* Detected Actions */}
        {email.detectedActions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Detected Actions
            </h3>
            <div className="space-y-2">
              {email.detectedActions.map((action, index) => {
                const Icon = actionIcons[action.type];
                return (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{action.description}</p>
                        {action.data && (
                          <p className="text-xs text-muted-foreground">
                            {Object.entries(action.data).map(([key, value]) => `${key}: ${value}`).join(' • ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                      Execute
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Suggested Reply */}
        {email.suggestedReply && email.threatLevel === 'safe' && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-info" />
              AI Suggested Reply
            </h3>
            <div className="p-4 rounded-xl bg-info/5 border border-info/20">
              <p className="text-sm text-foreground whitespace-pre-wrap mb-4">
                {email.suggestedReply}
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-info hover:bg-info/90 text-info-foreground">
                  <Send className="w-3 h-3 mr-1" />
                  Send Reply
                </Button>
                <Button size="sm" variant="outline" className="border-info/30 text-info hover:bg-info/10">
                  Edit First
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Phishing Warning */}
        {email.threatLevel === 'phishing' && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-destructive mb-1">Phishing Alert</h4>
                <p className="text-sm text-foreground/80">
                  This email has been identified as a potential phishing attempt. 
                  Do not click any links or provide personal information. 
                  The email has been automatically quarantined.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
