const BASE_URL = 'https://fresse-api.onrender.com/api';

export const getBowls = async (typeId?: number) => {
    const url = typeId ? `${BASE_URL}/bowls?type_id=${typeId}` : `${BASE_URL}/bowls`;
    const response = await fetch(url);
    if(!response.ok) throw new Error('Failed to fetch bowls');
    return response.json();
}

export const getCategories = async (typeId?: number) => {
    const url = typeId ? `${BASE_URL}/categories?type_id=${typeId}` : `${BASE_URL}/categories`;
    const response = await fetch(url);
    if(!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
}

export const getIngredients = async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    if(!response.ok) throw new Error('Failed to fetch ingredients');
    return response.json();
}

export const getBaseIngredients = async () => {
    const response = await fetch(`${BASE_URL}/baseingredients`);
    if(!response.ok) throw new Error('Failed to fetch base ingredients');
    return response.json();
}

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return response.json();
};

export const getPrices = async (token: string) => {
  const response = await fetch(`${BASE_URL}/prices`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch prices");
  return response.json();
};

export const saveRecipe = async (token: string, recipeData: {
  name: string;
  bowlId: number;
  ingredientIds: number[];
  is_public: boolean;
}) => {
  const response = await fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });

  if (!response.ok) throw new Error("Failed to save recipe");
  return response.json();
};