import axios from "axios";
import { SERVER_URL } from "./myconstant";
import { User } from "./interface";
import { NOTIFICATIONS } from "./myconstant/event";

export const requestNotificationHistory = (user: User) =>
  axios
    .get(`${SERVER_URL}/${NOTIFICATIONS}`, {
      params: {
        email: user.email
      }
    })
    .then(({ data }) => data.reverse());

export const requestChanageNotificationStatus = ({ notificationId, read }) =>
  axios.put(`${SERVER_URL}/${NOTIFICATIONS}`, {
    id: notificationId,
    read
  });
