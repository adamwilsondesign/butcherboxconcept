export interface Product {
  id: number;
  name: string;
  weight: string;
  lbs: number;
  price: number;
  category: "Beef" | "Chicken" | "Pork" | "Seafood" | "Ready to Cook";
  placeholder: string;
  color: string;
}

export interface CartItem extends Product {
  qty: number;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Ribeye Steak 2pk", weight: "1.5 lb", lbs: 1.5, price: 24, category: "Beef", placeholder: "Marbled ribeye steaks", color: "#C4A282" },
  { id: 2, name: "NY Strip 2pk", weight: "1.25 lb", lbs: 1.25, price: 22, category: "Beef", placeholder: "NY strip steaks", color: "#B8A090" },
  { id: 3, name: "Ground Beef", weight: "2 lb", lbs: 2, price: 12, category: "Beef", placeholder: "Ground beef pack", color: "#CAAE90" },
  { id: 4, name: "Sirloin Steak 2pk", weight: "1.5 lb", lbs: 1.5, price: 20, category: "Beef", placeholder: "Sirloin steaks", color: "#C9B8A8" },
  { id: 5, name: "Organic Chicken Breast", weight: "3 lb", lbs: 3, price: 18, category: "Chicken", placeholder: "Chicken breasts", color: "#D4C4A8" },
  { id: 6, name: "Chicken Thighs", weight: "2 lb", lbs: 2, price: 14, category: "Chicken", placeholder: "Chicken thighs pack", color: "#CAAE90" },
  { id: 7, name: "Drumsticks", weight: "2 lb", lbs: 2, price: 10, category: "Chicken", placeholder: "Raw drumsticks", color: "#D4B896" },
  { id: 8, name: "Chicken Nuggets", weight: "2 lb", lbs: 2, price: 14, category: "Ready to Cook", placeholder: "Breaded chicken nuggets", color: "#C9B8A8" },
  { id: 9, name: "Pork Chops 4pk", weight: "1.5 lb", lbs: 1.5, price: 16, category: "Pork", placeholder: "Bone-in pork chops", color: "#CAAE90" },
  { id: 10, name: "Baby Back Ribs", weight: "2 lb", lbs: 2, price: 20, category: "Pork", placeholder: "Rack of ribs", color: "#B8A090" },
  { id: 11, name: "Ground Pork", weight: "1 lb", lbs: 1, price: 10, category: "Pork", placeholder: "Ground pork pack", color: "#D4C4A8" },
  { id: 12, name: "Salmon Fillets 2pk", weight: "1 lb", lbs: 1, price: 22, category: "Seafood", placeholder: "Salmon fillets", color: "#C2A8A0" },
  { id: 13, name: "Sea Scallops", weight: "1 lb", lbs: 1, price: 26, category: "Seafood", placeholder: "Fresh sea scallops", color: "#A8BEC0" },
  { id: 14, name: "Wild Shrimp", weight: "1 lb", lbs: 1, price: 18, category: "Seafood", placeholder: "Raw wild shrimp", color: "#B8C8C0" },
  { id: 15, name: "Steak Tips", weight: "1 lb", lbs: 1, price: 15, category: "Ready to Cook", placeholder: "Marinated steak tips", color: "#C4A882" },
];
