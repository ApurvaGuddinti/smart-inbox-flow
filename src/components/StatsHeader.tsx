import { EmailStats } from '@/types/email';
import { 
  Inbox, 
  Shield, 
  Zap, 
  TrendingUp,
  Search,
  Bell,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StatsHeaderProps {
  stats: EmailStats;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const StatsHeader = ({ stats, searchQuery, onSearchChange }: StatsHeaderProps) => {
  const statCards = [
    { label: 'Total Emails', value: stats.total, icon: Inbox, color: 'text-primary' },
    { label: 'Unread', value: stats.unread, icon: TrendingUp, color: 'text-info' },
    { label: 'Threats', value: stats.threatCount, icon: Shield, color: stats.threatCount > 0 ? 'text-destructive' : 'text-success' },
    { label: 'Pending Actions', value: stats.actionsPending, icon: Zap, color: 'text-warning' },
  ];

  return (
    <div className="p-6 border-b border-border/50">
      {/* Search and Actions */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
          />
        </div>
        <Button variant="outline" size="icon" className="border-border/50">
          <Filter className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="border-border/50 relative">
          <Bell className="w-4 h-4" />
          {stats.threatCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground">
              {stats.threatCount}
            </span>
          )}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div 
            key={stat.label}
            className="p-4 rounded-xl bg-secondary/30 border border-border/30 fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
