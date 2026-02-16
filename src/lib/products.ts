import { IMAGES } from "./images";

export interface Product {
  id: number;
  name: string;
  weight: string;
  category: "Beef" | "Chicken" | "Pork" | "Seafood" | "Ready to Cook";
  sourceBadge: string;
  image: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Plan {
  id: "medium" | "large" | "xl";
  name: string;
  proteins: number;
  maxLbs: number;
  price: number;
}

export const PLANS: Plan[] = [
  { id: "medium", name: "Medium Signature Box", proteins: 6, maxLbs: 21, price: 179 },
  { id: "large", name: "Large Signature Box", proteins: 9, maxLbs: 31, price: 249 },
  { id: "xl", name: "Extra-Large Signature Box", proteins: 12, maxLbs: 42, price: 319 },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Ribeye Steak 2pk", weight: "1.5 lb", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.ribeye },
  { id: 2, name: "NY Strip 2pk", weight: "1.25 lb", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.nyStrip },
  { id: 3, name: "Ground Beef", weight: "2 lb", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.groundBeef },
  { id: 4, name: "Sirloin Steak 2pk", weight: "1.5 lb", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.sirloin },
  { id: 5, name: "Organic Chicken Breast", weight: "3 lb", category: "Chicken", sourceBadge: "Free-Range Organic", image: IMAGES.chickenBreast },
  { id: 6, name: "Chicken Thighs", weight: "2 lb", category: "Chicken", sourceBadge: "Free-Range", image: IMAGES.chickenThighs },
  { id: 7, name: "Drumsticks", weight: "2 lb", category: "Chicken", sourceBadge: "Free-Range", image: IMAGES.bonelessThighs },
  { id: 8, name: "Chicken Nuggets", weight: "2 lb", category: "Ready to Cook", sourceBadge: "All Natural", image: IMAGES.dicedChicken },
  { id: 9, name: "Pork Chops 4pk", weight: "1.5 lb", category: "Pork", sourceBadge: "Heritage Breed", image: IMAGES.porkChops },
  { id: 10, name: "Baby Back Ribs", weight: "2 lb", category: "Pork", sourceBadge: "Heritage Breed", image: IMAGES.porkRoast },
  { id: 11, name: "Ground Pork", weight: "1 lb", category: "Pork", sourceBadge: "Heritage Breed", image: IMAGES.porkTenderloin },
  { id: 12, name: "Salmon Fillets 2pk", weight: "1 lb", category: "Seafood", sourceBadge: "Wild-Caught", image: IMAGES.salmon },
  { id: 13, name: "Sea Scallops", weight: "1 lb", category: "Seafood", sourceBadge: "Wild-Caught", image: IMAGES.scallops },
  { id: 14, name: "Wild Shrimp", weight: "1 lb", category: "Seafood", sourceBadge: "Wild-Caught", image: IMAGES.lobster },
  { id: 15, name: "Steak Tips", weight: "1 lb", category: "Ready to Cook", sourceBadge: "Grass-Fed Marinated", image: IMAGES.barbacoa },
];
