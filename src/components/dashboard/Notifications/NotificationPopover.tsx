import React from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Bell, 
  Check, 
  X, 
  MoreVertical 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { NotificationCount } from '../NotificationCount';
import { useMediaQuery } from '@/hooks/use-media-query';

// Define the structure of a notification
interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationPopoverProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearNotification?: (id: string) => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  notifications,
  onMarkAsRead,
  onClearNotification
}) => {
  // Check if the screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Sort notifications with unread first, then by most recent
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.read !== b.read) {
      return a.read ? 1 : -1;
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  // Render notification list
  const renderNotificationList = () => (
    <>
      {notifications.length > 0 ? (
        <ScrollArea className={`${isMobile ? 'h-[calc(100vh-200px)]' : 'h-[300px]'}`}>
          <div className="p-2 space-y-2">
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
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                  <small className="text-[10px] text-gray-500">
                    {notification.timestamp.toLocaleString()}
                  </small>
                </div>
                <div className="flex items-center space-x-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
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
    </>
  );

  // Render mobile sheet or desktop popover
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <NotificationCount 
              count={notifications.filter(n => !n.read).length} 
              className="absolute -top-1 -right-1"
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </div>
              <span className="text-xs text-muted-foreground">
                {notifications.filter(n => !n.read).length} non lues
              </span>
            </SheetTitle>
          </SheetHeader>
          {renderNotificationList()}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <NotificationCount 
            count={notifications.filter(n => !n.read).length} 
            className="absolute -top-1 -right-1"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        align="end"
        sideOffset={10}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="text-sm font-semibold flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </h4>
          <span className="text-xs text-muted-foreground">
            {notifications.filter(n => !n.read).length} non lues
          </span>
        </div>
        
        {renderNotificationList()}
      </PopoverContent>
    </Popover>
  );
};
