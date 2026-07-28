import boardFoamie from "@/assets/board-foamie-new.png";
import boardMinimal from "@/assets/board-minimal-new.png";
import boardShortboard from "@/assets/board-shortboard-new.png";
import boardPro from "@/assets/board-pro-new.png";

import productTee from "@/assets/product-tee.jpg";
import productCap from "@/assets/product-cap.jpg";
import productShorts from "@/assets/product-shorts.jpg";
import productWetsuit from "@/assets/product-wetsuit.jpg";

import roomDorm from "@/assets/room-dorm.jpg";
import roomDouble from "@/assets/room-double.jpg";
import roomCabin from "@/assets/room-cabin.jpg";

export type Board = {
  slug: string;
  name: string;
  img: string;
  desc: string;
  daily: string;
  buy: string;
};

export const boards: Board[] = [
  { slug: "beginner-foamie", name: "BEGINNER FOAMIE", img: boardFoamie, desc: "Soft-top, stable and forgiving — perfect for first sessions.", daily: "€10 / day", buy: "€180" },
  { slug: "semi-advanced", name: "SEMI-ADVANCED", img: boardMinimal, desc: "The step-up mini-mal for surfers catching waves on their own.", daily: "€10 / day", buy: "€260" },
  { slug: "advanced-shortboard", name: "ADVANCED SHORTBOARD", img: boardShortboard, desc: "Performance shape for confident surfers hunting turns.", daily: "€10 / day", buy: "€340" },
  { slug: "pro-shortboard", name: "PRO SHORTBOARD", img: boardPro, desc: "High-performance board for advanced riders and contest days.", daily: "€12 / day", buy: "€420" },
];

export const packages = [
  { title: "Surfboard Only", desc: "Board of your choice, leash included, for the full day." },
  { title: "Board + Wetsuit — €15", desc: "Board plus a serviced wetsuit in your size — water is 17-20°C." },
  { title: "Board + Wetsuit + Lesson — €35", desc: "Board, wetsuit and a two-hour lesson with a local instructor." },
];

export type Room = {
  slug: string;
  name: string;
  img: string;
  price: string;
  desc: string;
};

export const rooms: Room[] = [
  { slug: "dorm", name: "Dorm Bed", img: roomDorm, price: "€12 / night", desc: "Six-bed shared room with individual lockers, reading lights and sea breeze." },
  { slug: "double", name: "Private Double", img: roomDouble, price: "€35 / night", desc: "Quiet double with private bathroom, fresh cotton linen and a desk." },
  { slug: "cabin", name: "Surf Cabin", img: roomCabin, price: "€45 / night", desc: "Wood-lined cabin for two with board rack, terrace access and morning sun." },
];

export type ProductCategory = "Streetwear" | "Basics" | "Bottoms" | "Outerwear";

export type Product = {
  slug: string;
  name: string;
  img: string;
  price: string;
  category: ProductCategory;
  sized: boolean;
  desc: string;
};

export const products: Product[] = [
  { slug: "area-classic-tee", name: "ÁREA Classic Tee", img: productTee, price: "$25", category: "Basics", sized: true, desc: "Heavyweight cotton crew-neck tee in teal — soft-washed and shot on the sand at Anza." },
  { slug: "surf-boardshorts", name: "Tropic Boardshorts", img: productShorts, price: "$40", category: "Bottoms", sized: true, desc: "Quick-dry 4-way stretch boardshorts with a tropical palm print — built for long paddles." },
  { slug: "sur-cap", name: "SUR. Cap", img: productCap, price: "$22", category: "Streetwear", sized: false, desc: "Unstructured 5-panel cap in mint with embroidered SUR. hit — one size, adjustable strap." },
  { slug: "area-springsuit", name: "ÁREA Springsuit", img: productWetsuit, price: "$180", category: "Outerwear", sized: true, desc: "Long-sleeve back-zip 2mm springsuit for 17–20°C water — built for daily Anza sessions." },
];

export const categories = ["All", "Streetwear", "Basics", "Bottoms", "Outerwear"] as const;
export const sizes = ["S", "M", "L", "XL", "XXL"] as const;
