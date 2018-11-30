import { UserGrade } from ".";

export interface Notification {
  id: string;
  title: string;
  message: string;
  importance: NotificationImportance;
  grade: UserGrade;
  createAt: number;
}

export enum NotificationImportance {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}
