import { request } from "..";

let env = process.env.REACT_APP_API_URL;

export async function sendForm(data) {
  let req = await request(env, "post", "/", data);
  return req;
}
