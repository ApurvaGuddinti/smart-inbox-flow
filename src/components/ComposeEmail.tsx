import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ComposeEmailProps {
  onClose: () => void;
  defaultTo?: string;
}

export const ComposeEmail = ({ onClose, defaultTo = '' }: ComposeEmailProps) => {
  const { toast } = useToast();
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!to.trim() || !subject.trim() || !body.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: { to, subject, body },
      });

      if (error) throw error;

      toast({
        title: "Email Sent",
        description: `Email sent to ${to}`,
      });
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Send Failed",
        description: error instanceof Error ? error.message : "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col glass-panel overflow-hidden">
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Compose Email</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">To</label>
          <Input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            className="bg-secondary/50 border-border/50"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Subject</label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            className="bg-secondary/50 border-border/50"
          />
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Message</label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message..."
            className="min-h-[300px] bg-secondary/50 border-border/50"
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={isSending}
          className="bg-primary hover:bg-primary/90"
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
