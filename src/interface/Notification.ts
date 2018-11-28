export interface PostNotificationData {
  title: string;
  message: string;
  importance: NotificationImportance;
  target: NotificationTarget;
}

export interface Notification extends PostNotificationData {
  key: string;
  createAt: Date;
}

export enum NotificationImportance {
  LOW = 100,
  MEDIUM = 200,
  HIGH = 300,
  URGENT = 400
}

export enum NotificationTarget {
  BRONZE = 100,
  SILVER = 200,
  GOLD = 300,
  PLATINUM = 400,
  ALL = 1000
}
