import { 
  Inbox, 
  Shield, 
  Zap, 
  MessageSquare, 
  Settings, 
  BarChart3,
  Folder,
  AlertTriangle,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmailStats } from '@/types/email';

interface SidebarProps {
  stats: EmailStats;
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar = ({ stats, activeView, onViewChange }: SidebarProps) => {
  const navItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: stats.unread },
    { id: 'sorted', label: 'AI Sorted', icon: Folder, count: stats.total },
    { id: 'security', label: 'Security', icon: Shield, count: stats.threatCount, alert: stats.threatCount > 0 },
    { id: 'actions', label: 'Actions', icon: Zap, count: stats.actionsPending },
    { id: 'replies', label: 'Auto-Replies', icon: MessageSquare },
  ];

  const bottomItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen glass-panel border-r border-border/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center glow-primary">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">MailAI</h1>
            <p className="text-xs text-muted-foreground">Intelligent Email</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              activeView === item.id
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              item.alert && "text-destructive"
            )} />
            <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
            {item.count !== undefined && item.count > 0 && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                item.alert 
                  ? "bg-destructive/20 text-destructive" 
                  : "bg-primary/20 text-primary"
              )}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* AI Status */}
      <div className="p-4 mx-4 mb-4 rounded-xl glass-panel">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-success">AI Agents Active</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Sorting Agent</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Security Agent</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Reply Agent</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-border/50 space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
              activeView === item.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};
