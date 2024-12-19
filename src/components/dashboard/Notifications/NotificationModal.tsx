import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, Check, X, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the structure of a notification
interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearNotification?: (id: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onOpenChange,
  notifications,
  onMarkAsRead,
  onClearNotification
}) => {
  // Sort notifications with unread first, then by most recent
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.read !== b.read) {
      return a.read ? 1 : -1;
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </DialogTitle>
          <DialogDescription>
            {notifications.length === 0 
              ? "Vous n'avez pas de nouvelles notifications" 
              : `Vous avez ${notifications.length} notifications`}
          </DialogDescription>
        </DialogHeader>
        
        {notifications.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {sortedNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`
                    p-3 rounded-lg border 
                    ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}
                    flex justify-between items-start
                  `}
                >
                  <div className="flex-grow mr-2">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <small className="text-xs text-gray-500">
                      {notification.timestamp.toLocaleString()}
                    </small>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {!notification.read && (
                          <DropdownMenuItem
                            onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
                            className="cursor-pointer flex"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Marquer comme lu
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="cursor-pointer flex text-red-600"
                          onClick={() => onClearNotification && onClearNotification(notification.id)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            Aucune notification pour le moment
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};