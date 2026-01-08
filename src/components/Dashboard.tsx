import { useState, useMemo } from 'react';
import { Sidebar } from './Sidebar';
import { EmailList } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { StatsHeader } from './StatsHeader';
import { GmailSettingsPanel } from './GmailSettings';
import { ComposeEmail } from './ComposeEmail';
import { mockEmails, calculateStats } from '@/data/mockEmails';
import { Email } from '@/types/email';

export const Dashboard = () => {
  const [activeView, setActiveView] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const stats = useMemo(() => calculateStats(mockEmails), []);

  const filteredEmails = useMemo(() => {
    let emails = [...mockEmails];

    // Filter by view
    switch (activeView) {
      case 'security':
        emails = emails.filter(e => e.threatLevel !== 'safe');
        break;
      case 'actions':
        emails = emails.filter(e => e.detectedActions.length > 0);
        break;
      case 'replies':
        emails = emails.filter(e => e.suggestedReply && e.threatLevel === 'safe');
        break;
      case 'sorted':
        // Show all, sorted by category
        emails = emails.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        // inbox - show all by date
        emails = emails.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      emails = emails.filter(e => 
        e.subject.toLowerCase().includes(query) ||
        e.from.toLowerCase().includes(query) ||
        e.body.toLowerCase().includes(query)
      );
    }

    return emails;
  }, [activeView, searchQuery]);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  // Check if current view is a settings view
  const isSettingsView = activeView === 'settings';

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        stats={stats} 
        activeView={activeView} 
        onViewChange={setActiveView}
        onCompose={() => setIsComposing(true)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {!isSettingsView && (
          <StatsHeader 
            stats={stats} 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
        
        {isSettingsView ? (
          <GmailSettingsPanel />
        ) : isComposing ? (
          <ComposeEmail onClose={() => setIsComposing(false)} />
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Email List */}
            <div className="w-[400px] border-r border-border/50 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-border/50">
                <h2 className="font-semibold text-foreground capitalize">
                  {activeView === 'inbox' ? 'All Emails' : activeView.replace('_', ' ')}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredEmails.length} email{filteredEmails.length !== 1 ? 's' : ''}
                </p>
              </div>
              <EmailList 
                emails={filteredEmails} 
                selectedId={selectedEmail?.id ?? null}
                onSelect={handleEmailSelect}
              />
            </div>

            {/* Email Detail */}
            <EmailDetail email={selectedEmail} />
          </div>
        )}
      </main>
    </div>
  );
};
