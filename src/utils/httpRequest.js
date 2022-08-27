import axios from "axios";

// const baseUrl = "http://localhost:2000";
const baseUrl = "https://event-management1721.herokuapp.com";

export const requestWithToken = async (method, endpoints, body) => {
  let request;
  const url = baseUrl + endpoints;
  const token = window.localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  switch (method) {
    case "GET":
      request = await axios.get(url, {
        headers: headers,
      });
      break;
    case "POST":
      request = await axios.post(url, body, {
        headers: headers,
      });
      break;
    case "PUT":
      request = await axios.put(url, body, {
        headers: headers,
      });
      break;
    case "DELETE":
      request = await axios.delete(
        url,
        body,
        { headers: headers },
      );
      break;
    default:
      break;
  }

  return request;
};
