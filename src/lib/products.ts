import { IMAGES } from "./images";

export interface Product {
  id: number;
  name: string;
  weight: string;
  description: string;
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
  perMeal: string;
  feeds: string;
}

export const PLANS: Plan[] = [
  { id: "medium", name: "Medium Signature Box", proteins: 6, maxLbs: 21, price: 179, perMeal: "~$8.50/meal", feeds: "Ideal for 2–3 people" },
  { id: "large", name: "Large Signature Box", proteins: 9, maxLbs: 31, price: 249, perMeal: "~$8.00/meal", feeds: "Ideal for 3–4 people" },
  { id: "xl", name: "Extra-Large Signature Box", proteins: 12, maxLbs: 42, price: 319, perMeal: "~$7.55/meal", feeds: "Ideal for 4–6 people" },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Ribeye Steak 2pk", weight: "1.5 lb", description: "Rich, well-marbled, best for grilling", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.ribeye },
  { id: 2, name: "NY Strip 2pk", weight: "1.25 lb", description: "Leaner cut, bold flavour", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.nyStrip },
  { id: 3, name: "Ground Beef", weight: "2 lb", description: "Everyday essential, 85/15 blend", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.groundBeef },
  { id: 4, name: "Sirloin Steak 2pk", weight: "1.5 lb", description: "Versatile, great for stir-fry or grill", category: "Beef", sourceBadge: "100% Grass-Fed", image: IMAGES.sirloin },
  { id: 5, name: "Organic Chicken Breast", weight: "3 lb", description: "Lean protein, endlessly versatile", category: "Chicken", sourceBadge: "Free-Range Organic", image: IMAGES.chickenBreast },
  { id: 6, name: "Chicken Thighs", weight: "2 lb", description: "Juicy dark meat, perfect roasted", category: "Chicken", sourceBadge: "Free-Range", image: IMAGES.chickenThighs },
  { id: 7, name: "Drumsticks", weight: "2 lb", description: "Kid-friendly, crispy when baked", category: "Chicken", sourceBadge: "Free-Range", image: IMAGES.bonelessThighs },
  { id: 8, name: "Chicken Nuggets", weight: "2 lb", description: "All-natural, ready in minutes", category: "Ready to Cook", sourceBadge: "All Natural", image: IMAGES.dicedChicken },
  { id: 9, name: "Pork Chops 4pk", weight: "1.5 lb", description: "Thick-cut, tender and juicy", category: "Pork", sourceBadge: "Heritage Breed", image: IMAGES.porkChops },
  { id: 10, name: "Baby Back Ribs", weight: "2 lb", description: "Fall-off-the-bone, slow-cook ready", category: "Pork", sourceBadge: "Heritage Breed", image: IMAGES.porkRoast },
  { id: 11, name: "Ground Pork", weight: "1 lb", description: "Great for meatballs and stir-fry", category: "Pork", sourceBadge: "Heritage Breed", image: IMAGES.porkTenderloin },
  { id: 12, name: "Salmon Fillets 2pk", weight: "1 lb", description: "Wild sockeye, rich in omega-3s", category: "Seafood", sourceBadge: "Wild-Caught", image: IMAGES.salmon },
  { id: 13, name: "Sea Scallops", weight: "1 lb", description: "Buttery, sears in 3 minutes", category: "Seafood", sourceBadge: "Wild-Caught", image: IMAGES.scallops },
  { id: 14, name: "Wild Shrimp", weight: "1 lb", description: "Sweet, firm, incredibly versatile", category: "Seafood", sourceBadge: "Wild-Caught", image: IMAGES.lobster },
  { id: 15, name: "Steak Tips", weight: "1 lb", description: "Pre-marinated, dinner in 15 min", category: "Ready to Cook", sourceBadge: "Grass-Fed Marinated", image: IMAGES.barbacoa },
];
