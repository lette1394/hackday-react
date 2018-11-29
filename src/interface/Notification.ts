import { UserGrade } from ".";

export interface NotificationInput {
  key: string;
  title: string;
  message: string;
  importance: NotificationImportance;
  userGrades: UserGrade[];
  createAt: Date;
}

export interface Notification extends NotificationInput {}

export enum NotificationImportance {
  LOW = 100,
  MEDIUM = 200,
  HIGH = 300,
  URGENT = 400
}
