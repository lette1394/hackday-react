import { NAMESPACE } from "./event";

export { notification } from "./socketEvent";

export const SERVER_URL = "http://localhost:8999";
export const SERVER_PORT = 8080; // nginx
export const SERVER_END_POINT = `http://localhost:${SERVER_PORT}/${NAMESPACE}`;
