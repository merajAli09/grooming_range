export const BRAND = {
  name: "ATELIER",
  descriptor: "GROOMING",
  tagline: "Grooming made simple.",
  eyebrow: "THE DAILY GROOMING RITUAL",
  heroHeadline: "MADE FOR YOUR EVERYDAY.",
  heroSubhead: "Three essentials. One considered ritual. Grooming made simple.",
  philosophyHeadline: "LESS, BUT BETTER.",
  philosophySubhead: "Everyday grooming, distilled to the essentials. Three considered products for a routine that feels effortless.",
  contactEmail: "concierge@ateliergrooming.com",
  instagram: "@ateliergrooming",
};

export const PRODUCTS = [
  {
    id: "face-wash",
    category: "DAILY CLEANSING",
    name: "Vitamin C Cleanser",
    subtitle: "Vitamin C Cleanser",
    image: "/assets/face-wash.jpg",
    description: "A refreshing first step to a cleaner, more considered daily routine.",
    longDescription: "Formulated to lift away impurities without stripping natural moisture. Powered by antioxidant-rich Vitamin C to leave your skin clean, refreshed, and primed for hydration.",
    cta: "EXPLORE CLEANSER",
    ritualStep: "01",
    ritualAction: "Cleanse",
    ritualInstruction: "Massage one to two pumps onto damp face in gentle circular motions. Rinse thoroughly with lukewarm water. Use morning and night.",
    // Variants: array of { size, price } — price in INR
    variants: [
      { size: "50 ml",  price: "₹200" },
      { size: "100 ml", price: "₹300" },
      { size: "150 ml", price: "₹350" },
    ],
    defaultVariantIndex: 2, // 150 ml — ₹350
    ingredients: [
      "Vitamin C (Ascorbic Acid)",
      "Botanical Cleansing Extract",
      "Green Tea Leaf Extract",
      "Purified Water",
      "Vegetable Glycerin",
    ],
    benefits: [
      "Removes surface impurities and excess oil",
      "Brightens skin tone with natural Vitamin C",
      "Leaves skin supple without feeling tight",
    ],
  },
  {
    id: "moisturiser",
    category: "DAILY HYDRATION",
    name: "Moisturiser",
    subtitle: "Daily Hydrating Lotion",
    image: "/assets/moisturiser.jpg",
    description: "An everyday essential designed to complete your skincare ritual.",
    longDescription: "A fast-absorbing, lightweight hydrating lotion engineered specifically for men's skin. Locks in essential moisture, restores skin barrier resilience, and leaves a clean, matte finish.",
    cta: "EXPLORE MOISTURISER",
    ritualStep: "02",
    ritualAction: "Hydrate",
    ritualInstruction: "Apply a nickel-sized amount evenly across clean face and neck. Allow 30 seconds to fully absorb.",
    variants: [
      { size: "50 ml",  price: "₹150" },
      { size: "100 ml", price: "₹175" },
      { size: "150 ml", price: "₹225" },
    ],
    defaultVariantIndex: 2, // 150 ml — ₹225
    ingredients: [
      "Hyaluronic Acid Complex",
      "Niacinamide (Vitamin B3)",
      "Plant-derived Squalane",
      "Organic Aloe Vera",
      "Tocopherol (Vitamin E)",
    ],
    benefits: [
      "24-hour hydration without oiliness",
      "Protects against environmental fatigue",
      "Smooths skin texture and calms razor burn",
    ],
  },
  {
    id: "beard-oil",
    category: "BEARD CARE",
    name: "Beard Oil",
    subtitle: "Vitamin E & Jojoba",
    image: "/assets/beard-oil.jpg",
    description: "A simple finishing touch for a well-maintained beard.",
    longDescription: "A lightweight, non-comedogenic blend of cold-pressed Jojoba and Vitamin E oils. Nourishes beard hair from root to tip, softens stubble, and conditions underlying facial skin.",
    cta: "EXPLORE BEARD OIL",
    ritualStep: "03",
    ritualAction: "Maintain",
    ritualInstruction: "Dispense 3 to 5 drops into palm, work through hands, and massage evenly through beard and onto underlying skin.",
    variants: [
      { size: "5 ml",  price: "₹200" },
      { size: "10 ml", price: "₹250" },
      { size: "15 ml", price: "₹325" },
    ],
    defaultVariantIndex: 2, // 15 ml — ₹325
    ingredients: [
      "Organic Jojoba Seed Oil",
      "Vitamin E Oil",
      "Cold-Pressed Argan Oil",
      "Atlas Cedarwood Extract",
      "Bergamot Essential Oil",
    ],
    benefits: [
      "Softens coarse facial hair and stubble",
      "Prevents dry skin and beard itchiness",
      "Imparts a natural, non-greasy sheen",
    ],
  },
];

/**
 * Helper — given a product and a selectedVariantIndices map, return the
 * currently active variant object { size, price }.
 */
export function getActiveVariant(product, selectedVariantIndices) {
  const idx =
    selectedVariantIndices?.[product.id] ?? product.defaultVariantIndex;
  return product.variants[idx];
}
