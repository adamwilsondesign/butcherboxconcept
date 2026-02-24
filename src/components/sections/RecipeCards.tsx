"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSignup } from "@/components/signup/SignupFlow";

interface Recipe {
  title: string;
  protein: string;
  image: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
}

const RECIPES: Recipe[] = [
  {
    title: "Herb-Crusted Ribeye",
    protein: "Grass-Fed Beef",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    time: "25 min",
    servings: "2",
    ingredients: [
      "2 ribeye steaks (1\" thick)",
      "2 tbsp fresh rosemary, chopped",
      "2 tbsp fresh thyme, chopped",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "Flaky sea salt & cracked pepper",
      "2 tbsp butter",
    ],
    steps: [
      "Bring steaks to room temperature for 30 minutes. Pat dry and season generously with salt and pepper.",
      "Mix rosemary, thyme, garlic, and olive oil into a paste. Press the herb mixture onto both sides of each steak.",
      "Heat a cast-iron skillet over high heat until smoking. Sear steaks 4 minutes per side for medium-rare.",
      "Add butter to the pan in the final minute, basting the steaks. Rest 5 minutes before slicing.",
    ],
  },
  {
    title: "Lemon Garlic Chicken",
    protein: "Free-Range Chicken",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
    time: "40 min",
    servings: "4",
    ingredients: [
      "4 bone-in chicken thighs",
      "3 lemons (juiced + zested)",
      "6 cloves garlic, smashed",
      "3 tbsp olive oil",
      "1 tsp dried oregano",
      "Fresh parsley for garnish",
      "Salt & pepper to taste",
    ],
    steps: [
      "Preheat oven to 425\u00b0F. Season chicken thighs with salt, pepper, and oregano.",
      "Whisk lemon juice, zest, garlic, and olive oil. Pour over the chicken in a baking dish.",
      "Roast for 35-40 minutes until skin is golden and internal temp reaches 165\u00b0F.",
      "Let rest 5 minutes. Garnish with fresh parsley and serve with pan juices.",
    ],
  },
  {
    title: "Maple-Glazed Salmon",
    protein: "Wild-Caught Seafood",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    time: "20 min",
    servings: "2",
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "3 tbsp pure maple syrup",
      "1 tbsp soy sauce",
      "1 tbsp Dijon mustard",
      "1 clove garlic, minced",
      "Sesame seeds for garnish",
      "Steamed rice for serving",
    ],
    steps: [
      "Preheat oven to 400\u00b0F. Line a baking sheet with parchment. Pat salmon dry.",
      "Whisk maple syrup, soy sauce, mustard, and garlic. Brush generously over salmon.",
      "Bake 12-15 minutes until salmon flakes easily. Broil the last 2 minutes for a caramelized glaze.",
      "Sprinkle with sesame seeds and serve over steamed rice.",
    ],
  },
  {
    title: "Slow-Braised Pork Tacos",
    protein: "Crate-Free Pork",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    time: "3 hrs",
    servings: "6",
    ingredients: [
      "2 lbs pork shoulder, cubed",
      "2 tbsp chili powder",
      "1 tbsp cumin",
      "1 onion, diced",
      "4 cloves garlic, minced",
      "1 cup chicken broth",
      "Corn tortillas, cilantro, lime",
    ],
    steps: [
      "Season pork with chili powder, cumin, salt, and pepper. Sear in a Dutch oven on all sides.",
      "Add onion and garlic, cook until softened. Pour in broth and bring to a simmer.",
      "Cover and cook on low for 2.5-3 hours until pork shreds easily with a fork.",
      "Shred pork, pile onto warm tortillas with cilantro, diced onion, and a squeeze of lime.",
    ],
  },
  {
    title: "Grilled Steak Salad",
    protein: "Grass-Fed Beef",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
    time: "20 min",
    servings: "2",
    ingredients: [
      "1 flank steak (1 lb)",
      "6 cups mixed greens",
      "1 avocado, sliced",
      "Cherry tomatoes, halved",
      "Shaved parmesan",
      "Balsamic vinaigrette",
      "Salt & pepper to taste",
    ],
    steps: [
      "Season flank steak with salt and pepper. Grill over high heat, 4-5 minutes per side for medium-rare.",
      "Rest steak 5 minutes, then slice thinly against the grain.",
      "Arrange greens, tomatoes, and avocado on plates. Top with sliced steak and shaved parmesan.",
      "Drizzle with balsamic vinaigrette and serve immediately.",
    ],
  },
  {
    title: "Honey-Soy Chicken Bowl",
    protein: "Free-Range Chicken",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    time: "30 min",
    servings: "4",
    ingredients: [
      "4 chicken breasts, cubed",
      "3 tbsp honey",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "Steamed rice & broccoli",
      "Green onions & sesame seeds",
    ],
    steps: [
      "Whisk honey, soy sauce, sesame oil, and garlic in a bowl.",
      "Saut\u00e9 chicken cubes in a hot skillet until golden, about 6-7 minutes.",
      "Pour the honey-soy sauce over the chicken. Toss and cook 2-3 minutes until glazed.",
      "Serve over steamed rice with broccoli. Top with green onions and sesame seeds.",
    ],
  },
];

export default function RecipeCards() {
  const { openSignup } = useSignup();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header with scroll arrows */}
          <div className="flex items-end justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                label="Inspiration for Every Night"
                title="What Will You Make?"
                className="text-left"
              />
            </div>

            <div className="hidden gap-3 sm:flex">
              <button
                onClick={() => scroll("left")}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5DDD4] bg-white text-[#1B4332] transition-all hover:bg-[#2D6A4F] hover:text-white"
                aria-label="Scroll recipes left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5DDD4] bg-white text-[#1B4332] transition-all hover:bg-[#2D6A4F] hover:text-white"
                aria-label="Scroll recipes right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Scrolling recipe cards — 4 visible at a time */}
          <div
            ref={scrollRef}
            className="-mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
            style={{ scrollbarWidth: "none" }}
          >
            {RECIPES.map((recipe, i) => (
              <motion.button
                key={recipe.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                onClick={() => setSelectedRecipe(recipe)}
                className="group relative min-w-[260px] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md lg:min-w-[calc((100%-60px)/4)] lg:max-w-none"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Background image */}
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                  }}
                />

                {/* Protein badge — top left */}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#2D6A4F] backdrop-blur-sm">
                  {recipe.protein}
                </span>

                {/* Title + meta — bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-sans font-bold text-lg leading-snug text-white sm:text-xl">
                    {recipe.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[12px] text-white/70">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {recipe.servings} servings
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <>
            {/* Backdrop */}
            <motion.div
              key="recipe-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-black/50"
              onClick={() => setSelectedRecipe(null)}
            />

            {/* Modal */}
            <motion.div
              key="recipe-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-4 z-[101] mx-auto my-auto flex max-h-[90vh] max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:inset-8 lg:flex-row"
            >
              {/* Left column — Recipe */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
                {/* Close button — mobile */}
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-sm transition-colors hover:bg-black/20 lg:bg-white/90 lg:text-[#1A1A1A] lg:hover:bg-white"
                  aria-label="Close recipe"
                >
                  <X size={18} />
                </button>

                {/* Hero image — mobile/tablet */}
                <div className="-mx-6 -mt-6 mb-6 aspect-video overflow-hidden sm:-mx-8 sm:-mt-8 lg:hidden">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#005A73]">
                  {selectedRecipe.protein}
                </span>
                <h2 className="mt-1 font-sans font-extrabold text-2xl text-[#1A1A1A] sm:text-3xl">
                  {selectedRecipe.title}
                </h2>

                <div className="mt-3 flex items-center gap-4 text-sm text-[#6B6B6B]">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#2D6A4F]" /> {selectedRecipe.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-[#2D6A4F]" /> {selectedRecipe.servings} servings
                  </span>
                </div>

                {/* Ingredients */}
                <h3 className="mt-8 font-sans font-bold text-base text-[#1A1A1A]">
                  Ingredients
                </h3>
                <ul className="mt-3 space-y-2">
                  {selectedRecipe.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2D6A4F]" />
                      {ing}
                    </li>
                  ))}
                </ul>

                {/* Instructions */}
                <h3 className="mt-8 font-sans font-bold text-base text-[#1A1A1A]">
                  Instructions
                </h3>
                <ol className="mt-3 space-y-4">
                  {selectedRecipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#6B6B6B]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2D6A4F]/10 text-xs font-bold text-[#2D6A4F]">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed" style={{ lineHeight: 1.7 }}>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right column — CTA + image (desktop) */}
              <div className="relative hidden w-[340px] shrink-0 flex-col bg-[#005A73] lg:flex">
                {/* Recipe image — top */}
                <div className="h-[45%] overflow-hidden">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* CTA content — bottom */}
                <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    ButcherBox
                  </p>
                  <h3 className="mt-3 font-sans font-extrabold text-xl leading-snug text-white">
                    Get Premium Proteins Delivered to Your Door
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70" style={{ lineHeight: 1.7 }}>
                    100% grass-fed beef, free-range chicken, wild-caught seafood
                    &mdash; delivered free with every box.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRecipe(null);
                      openSignup();
                    }}
                    className="mt-6 w-full rounded-lg bg-[#2D6A4F] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B4332]"
                  >
                    Build Your Box
                  </button>
                  <p className="mt-3 text-[11px] text-white/50">
                    Plans from $5.27/meal &middot; Free shipping always
                  </p>
                </div>
              </div>

              {/* Mobile CTA — bottom bar */}
              <div className="border-t border-[#E5DDD4] bg-[#FAF7F2] p-4 lg:hidden">
                <button
                  onClick={() => {
                    setSelectedRecipe(null);
                    openSignup();
                  }}
                  className="w-full rounded-lg bg-[#2D6A4F] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B4332]"
                >
                  Get Premium Proteins Delivered →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
