
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, MailOpen, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Database } from "@/integrations/supabase/types";

type Message = Database['public']['Tables']['contact_messages']['Row'];

export function AdminMessages() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const viewMessage = async (message: Message) => {
    setCurrentMessage(message);
    setDialogOpen(true);
    
    // Mark as read if not already
    if (!message.read) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .update({ read: true })
          .eq('id', message.id);
          
        if (error) throw error;
        
        // Update local state
        setMessages(messages.map(msg => 
          msg.id === message.id ? { ...msg, read: true } : msg
        ));
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Message deleted successfully!');
      fetchMessages();
      
      // Close dialog if the deleted message was being viewed
      if (currentMessage?.id === id) {
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
        <p className="text-muted-foreground">
          When someone contacts you through your portfolio, messages will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contact Messages</h2>
      
      <div className="space-y-3">
        {messages.map((message) => (
          <Card 
            key={message.id}
            className={message.read ? "opacity-75" : ""}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${message.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                    {message.read ? (
                      <MailOpen className="h-5 w-5" />
                    ) : (
                      <Mail className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div>
                    <div className="font-medium">{message.name}</div>
                    <div className="text-sm text-muted-foreground">{message.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {formatDate(message.created_at)}
                  </Badge>
                  
                  {!message.read && (
                    <Badge variant="secondary">New</Badge>
                  )}
                  
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => viewMessage(message)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 text-sm line-clamp-1 text-muted-foreground">
                {message.message}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {currentMessage && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message from {currentMessage.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">From:</div>
                  <div className="font-medium">{currentMessage.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Received:</div>
                  <div>{formatDate(currentMessage.created_at)}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Email:</div>
                <a href={`mailto:${currentMessage.email}`} className="text-primary flex items-center gap-1 hover:underline">
                  {currentMessage.email}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Message:</div>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {currentMessage.message}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${currentMessage.email}?subject=Re: Message from your portfolio`, '_blank')}
                >
                  Reply via Email
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteMessage(currentMessage.id)}
                >
                  Delete Message
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
