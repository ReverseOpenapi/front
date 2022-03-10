import axios from "axios";

export async function request(server, method, uri, data) {
  const withData = ["get", "delete"];
  const withoutData = ["post", "put"];
  const $load = document.querySelector(".loading");
  if ($load) $load.classList.add("show");

  try {
    if (!uri) {
      if ($load) $load.classList.remove("show");
      return;
    }
    let url = server + uri;

    let headers = {
      "Content-Type": "application/json",
    };

    let request;

    method = method.toLowerCase();

    if (withData.includes(method)) {
      let config = { method, headers };
      config.url = data ? `${url}?${data}` : url;
      request = await axios(config);
    } else if (withoutData.includes(method)) {
      if (!data) {
        data = {};
      }
      let options = { headers };
      request =
        method == "post"
          ? await axios.post(url, data, options)
          : await axios.put(url, data, options);
    } else {
      if ($load) $load.classList.remove("show");
      return;
    }
    if ($load) $load.classList.remove("show");
    return request.data;
  } catch (err) {
    if ($load) $load.classList.remove("show");
    if (err.response == undefined) {
      return;
    } else {
      return err.response.data.message;
    }
  }
}
