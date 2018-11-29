import { UserGrade } from ".";

export interface Notification {
  key: string;
  title: string;
  message: string;
  importance: NotificationImportance;
  grade: UserGrade;
  createAt: number;
}

enum NotificationStatus {
  READ = "READ",
  UNREAD = "UNREAD"
}

export interface NotificationHistory extends Notification {
  status: NotificationStatus;
}

export enum NotificationImportance {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}
