"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useGetNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notification/notificationApi";
import { Bell } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_API_URL_LOCAL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const Notification = () => {
  const [notification, setNotification] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dylvitw9y/video/upload/v1748031862/odhpfqthe2nkmoclnbka.wav"
    )
  );
  const { data, refetch } = useGetNotificationsQuery({});

  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
  console.log(notification);

  const playerNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    socketId.on("newNotification", (data: any) => {
      playerNotificationSound();
      refetch();
      setNotification(data);
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New course available",
      message: "Advanced JavaScript course is now available",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Assignment reminder",
      message: "Your React project is due tomorrow",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Certificate issued",
      message: "Your Web Development certificate is ready",
      time: "1 day ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div>
      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="cursor-pointer hover:text-dark-900 relative flex h-9 lg:h-10  w-9 lg:w-10  items-center justify-center rounded-full border border-gray-400 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-[rgb(37,150,190)] hover:text-[rgb(37,150,190)]/80"
              >
                Mark all as read
              </Button>
            )}
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {data?.data?.length > 0 ? (
              data?.data?.map((notification: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    !notification.read
                      ? "bg-blue-50/50 dark:bg-blue-900/10"
                      : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">
                      {notification?.title}
                    </h4>
                    {!notification.read && (
                      <Badge className="bg-[rgb(37,150,190)] text-white text-[10px] px-1.5">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {format(notification?.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications Yet
              </div>
            )}
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-xs w-full"
            >
              <Link href="/dashboard/notifications">
                View all notifications
              </Link>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Notification;
