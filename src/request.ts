import axios from "axios";
import { SERVER_URL } from "./myconstant";
import { User } from "./interface";

export const requestNotificationHistory = (user: User) =>
  axios
    .get(`${SERVER_URL}/notifications`, {
      params: {
        email: user.email
      }
    })
    .then(({ data }) => data.reverse());
