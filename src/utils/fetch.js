const fetchRequest = async ({ endpoint, method = "post", accessToken = "", ...params }) => {
  const response = await fetch(
    `https://guarded-thicket-22918.herokuapp.com/${endpoint}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      method,
      body: method === "get" ? null : JSON.stringify(params)
    });

  return await response.json();
};

export default fetchRequest;
