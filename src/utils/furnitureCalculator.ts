import type { FurnitureItem, FurnitureEstimate } from '../types/property';

export const INITIAL_FURNITURE_ITEMS: FurnitureItem[] = [
  { id: 'sofa', name: 'Sofa Set (3+2 / L-Shape)', category: 'Furniture', unitPriceStandard: 45000, unitPriceLuxury: 120000, quantity: 1, selected: true, iconName: 'Armchair' },
  { id: 'bed', name: 'King/Queen Bed with Mattress', category: 'Furniture', unitPriceStandard: 32000, unitPriceLuxury: 85000, quantity: 2, selected: true, iconName: 'Bed' },
  { id: 'wardrobe', name: 'Full-Height Wardrobe', category: 'Furniture', unitPriceStandard: 38000, unitPriceLuxury: 95000, quantity: 2, selected: true, iconName: 'Box' },
  { id: 'dining', name: 'Dining Table & Chairs (4-6 Seater)', category: 'Furniture', unitPriceStandard: 28000, unitPriceLuxury: 75000, quantity: 1, selected: true, iconName: 'Utensils' },
  { id: 'tv_unit', name: 'Entertainment & TV Unit', category: 'Furniture', unitPriceStandard: 22000, unitPriceLuxury: 60000, quantity: 1, selected: true, iconName: 'Tv' },
  { id: 'fridge', name: 'Refrigerator (Double Door/Side-by-Side)', category: 'Appliance', unitPriceStandard: 35000, unitPriceLuxury: 95000, quantity: 1, selected: true, iconName: 'Refrigerator' },
  { id: 'washing_machine', name: 'Washing Machine (Front/Top Load)', category: 'Appliance', unitPriceStandard: 25000, unitPriceLuxury: 65000, quantity: 1, selected: true, iconName: 'Wind' },
  { id: 'ac', name: 'Inverter Split AC (1.5 Ton)', category: 'Appliance', unitPriceStandard: 36000, unitPriceLuxury: 68000, quantity: 2, selected: true, iconName: 'Zap' },
  { id: 'kitchen', name: 'Modular Kitchen & Chimney', category: 'Kitchen', unitPriceStandard: 150000, unitPriceLuxury: 380000, quantity: 1, selected: true, iconName: 'ChefHat' },
];

export function calculateFurnitureEstimate(
  items: FurnitureItem[],
  tier: 'Standard' | 'Luxury',
  bhk: number = 2
): FurnitureEstimate {
  let totalFurnitureCost = 0;

  const updatedItems = items.map(item => {
    let qty = item.quantity;
    if (['bed', 'wardrobe', 'ac'].includes(item.id) && bhk > 0) {
      qty = Math.max(1, bhk);
    }

    const unitPrice = tier === 'Luxury' ? item.unitPriceLuxury : item.unitPriceStandard;
    const itemTotal = item.selected ? unitPrice * qty : 0;
    totalFurnitureCost += itemTotal;

    return {
      ...item,
      quantity: qty
    };
  });

  const interiorDecoratorBudget = Math.round(totalFurnitureCost * 0.28);
  const totalReadyToMoveCost = totalFurnitureCost + interiorDecoratorBudget;

  return {
    items: updatedItems,
    tier,
    totalFurnitureCost,
    interiorDecoratorBudget,
    totalReadyToMoveCost
  };
}
