const BASE_URL = 'https://fresse-api.onrender.com/api';

export const getBowls = async () => {
    const response = await fetch(`${BASE_URL}/bowls`);

    if(!response.ok) {
        throw new Error('Failed to fetch bowls');
    }

    return response.json();
}

export const getCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories`);

    if(!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    return response.json();
}

export const getIngredients = async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);

    if(!response.ok) {
        throw new Error('Failed to fetch ingredients');
    }

    return response.json();
}

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export const getPrices = async (token: string) => {
  const response = await fetch(`${BASE_URL}/prices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prices");
  }

  return response.json();
};