const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
};

export default {
  fetchApi: (path, method, payload) => {
    var options = {
      method: method,
      headers: headers,
      body: JSON.stringify(payload),
    };
    return fetch(path, options).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  },
};
