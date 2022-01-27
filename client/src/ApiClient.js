const URL = "http://localhost:3001";

function fetchRequest(url, options) {
  return fetch(url, options)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      console.log("Error:", err);
    });
}

export function getShopsByKeyword(keyword) {
  keyword = { searchTerm: keyword };
  return fetchRequest(`${URL}/shop/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(keyword),
  });
}

export function getShopsByUserId(UserId) {
  UserId = { UserId: UserId };
  return fetchRequest(`${URL}/shop/userShops`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function register(user) {
  return fetchRequest(`${URL}/user/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export function login(user) {
  return fetchRequest(`${URL}/user/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export function profile() {
  return fetchRequest(`${URL}/user/profile`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function logout() {
  return fetchRequest(`${URL}/user/logout`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function createShop(shop) {
  console.log(shop);
  return fetchRequest(`${URL}/shop/createshop`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shop),
  });
}

export function uploadImage(base64EncodedImage) {
  return fetchRequest(`${URL}/uploadimage`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: base64EncodedImage }),
  });
}

export function addImage(shopIdAndImgUrlObj) {
  return fetchRequest(`${URL}/addimage`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shopIdAndImgUrlObj),
  });
}

export function addProducts(shopIdAndProductsObj) {
  return fetchRequest(`${URL}/shop/addProducts`, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shopIdAndProductsObj),
  });
}

export function removeProduct(shopIdAndProductObj) {
  return fetchRequest(`${URL}/shop/removeProduct`, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shopIdAndProductObj),
  });
}
