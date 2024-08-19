// src/utils/localStorageHelper.js

// Set data in localStorage with expiration
export const setWithExpiry = (key, value, ttl) => {
    const now = new Date();

    // `ttl` is the time to live in milliseconds
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  // Get data from localStorage and check if it is expired
  export const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Compare the expiry time with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, remove it from storage and return null
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  };
