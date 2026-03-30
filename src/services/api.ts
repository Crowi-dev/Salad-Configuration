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