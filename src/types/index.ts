export interface BaseType {
    id: number;
    name: String;
    price?: number;
    image_url?: String;
    barcode_url?: String;
}
export interface Bowl extends BaseType {
    base_type_id?: number;
    volume?: number;
    slot_count: number;
    shape: 'round' | 'square';
}
export interface Category {
    id: number;
    name: String;
    base_type_id?: number;
}
export interface Ingredient extends BaseType {
    categoryId: number;
    diets: String[];
    weight_grams?: number;
}