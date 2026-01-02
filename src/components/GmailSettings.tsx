import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Plus,
  Trash2,
  Settings,
  Zap,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bot,
  Filter,
  MessageSquare,
  Power,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmailFilter, FilterType, GmailSettings } from '@/types/settings';

const defaultPrompt = `Your name is [Your Name] and you are a customer service representative working for [Company] which sells [Products/Services]. Please respond to the following email in a polite and attentive tone. Make sure to keep your response short and succinct without repeating your message or promising anything you can't deliver. Please direct them to [Contact Info] for more information and promise that someone will get back to them as soon as possible.`;

export const GmailSettingsPanel = () => {
  const [settings, setSettings] = useState<GmailSettings>({
    connected: false,
    email: '',
    checkIntervalSeconds: 300,
    daysToLookBack: 0,
    autoReplyEnabled: true,
    filters: [
      {
        id: '1',
        filterType: 'email',
        emailAddress: 'support@example.com',
        chatgptPrompt: defaultPrompt,
        enabled: true,
      },
    ],
  });

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection
    setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        connected: true,
        email: 'user@gmail.com',
      }));
      setIsConnecting(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setSettings(prev => ({
      ...prev,
      connected: false,
      email: '',
    }));
  };

  const addFilter = () => {
    const newFilter: EmailFilter = {
      id: Date.now().toString(),
      filterType: 'email',
      emailAddress: '',
      chatgptPrompt: defaultPrompt,
      enabled: true,
    };
    setSettings(prev => ({
      ...prev,
      filters: [...prev.filters, newFilter],
    }));
  };

  const updateFilter = (id: string, updates: Partial<EmailFilter>) => {
    setSettings(prev => ({
      ...prev,
      filters: prev.filters.map(f =>
        f.id === id ? { ...f, ...updates } : f
      ),
    }));
  };

  const deleteFilter = (id: string) => {
    setSettings(prev => ({
      ...prev,
      filters: prev.filters.filter(f => f.id !== id),
    }));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive to-warning flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Gmail Auto-Responder</h2>
            <p className="text-sm text-muted-foreground">Configure filters and AI prompts</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Connection Status */}
        <div className="p-4 rounded-xl glass-panel border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                settings.connected ? "bg-success animate-pulse" : "bg-muted-foreground"
              )} />
              <span className="font-medium text-foreground">
                {settings.connected ? 'Connected' : 'Not Connected'}
              </span>
              {settings.email && (
                <span className="text-sm text-muted-foreground">({settings.email})</span>
              )}
            </div>
            {settings.connected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <Power className="w-4 h-4 mr-1" />
                Disconnect
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-primary hover:bg-primary/90"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-1" />
                    Connect Gmail
                  </>
                )}
              </Button>
            )}
          </div>

          {!settings.connected && (
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/80">
                <p className="font-medium text-warning mb-1">Gmail App Password Required</p>
                <p className="text-muted-foreground">
                  You'll need to create an App Password in your Google Account settings. 
                  This is different from your regular Gmail password.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* General Settings */}
        <div className="p-4 rounded-xl glass-panel border border-border/50">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            General Settings
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Check Interval (seconds)
              </Label>
              <Input
                type="number"
                value={settings.checkIntervalSeconds}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  checkIntervalSeconds: parseInt(e.target.value) || 300
                }))}
                className="bg-secondary/50 border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                Default: 300 seconds (5 minutes)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Days to Look Back
              </Label>
              <Input
                type="number"
                value={settings.daysToLookBack}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  daysToLookBack: parseInt(e.target.value) || 0
                }))}
                className="bg-secondary/50 border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                0 = Today only, 1 = Yesterday, etc.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Auto-Reply Enabled</span>
            </div>
            <Switch
              checked={settings.autoReplyEnabled}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                autoReplyEnabled: checked
              }))}
            />
          </div>
        </div>

        {/* Filters & Prompts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              Email Filters & Prompts
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={addFilter}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Filter
            </Button>
          </div>

          {settings.filters.map((filter, index) => (
            <div
              key={filter.id}
              className={cn(
                "p-4 rounded-xl border transition-all",
                filter.enabled
                  ? "glass-panel border-border/50"
                  : "bg-secondary/30 border-border/30 opacity-60"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                    filter.enabled ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-foreground">Filter Rule</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={filter.enabled}
                    onCheckedChange={(checked) => updateFilter(filter.id, { enabled: checked })}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteFilter(filter.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Filter Type</Label>
                  <Select
                    value={filter.filterType}
                    onValueChange={(value: FilterType) => updateFilter(filter.id, { filterType: value })}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Address Only</SelectItem>
                      <SelectItem value="subject">Subject Only</SelectItem>
                      <SelectItem value="both">Both Email & Subject</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(filter.filterType === 'email' || filter.filterType === 'both') && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Email Address</Label>
                    <Input
                      placeholder="sender@example.com"
                      value={filter.emailAddress || ''}
                      onChange={(e) => updateFilter(filter.id, { emailAddress: e.target.value })}
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                )}

                {(filter.filterType === 'subject' || filter.filterType === 'both') && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Subject Keyword</Label>
                    <Input
                      placeholder="Order Confirmation"
                      value={filter.subjectKeyword || ''}
                      onChange={(e) => updateFilter(filter.id, { subjectKeyword: e.target.value })}
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5" />
                  ChatGPT Prompt Template
                </Label>
                <Textarea
                  value={filter.chatgptPrompt}
                  onChange={(e) => updateFilter(filter.id, { chatgptPrompt: e.target.value })}
                  className="bg-secondary/50 border-border/50 min-h-[120px] text-sm"
                  placeholder="Enter your AI prompt template..."
                />
              </div>
            </div>
          ))}

          {settings.filters.length === 0 && (
            <div className="p-8 rounded-xl glass-panel border border-dashed border-border/50 text-center">
              <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-3">
                No filters configured yet. Add a filter to start auto-replying.
              </p>
              <Button
                size="sm"
                onClick={addFilter}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add First Filter
              </Button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
          <Button variant="outline" className="border-border/50">
            Reset to Defaults
          </Button>
          <Button className="bg-success hover:bg-success/90 text-success-foreground">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
