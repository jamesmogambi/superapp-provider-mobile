// generateOrders.js — run with: node generateOrders.js

import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// --- Configuration ---
const PROVIDER_ID = "user_3GSlAPidWynnGBfnHAcwZj52VWx";
const NUM_ORDERS = 20;

// --- Seed Data Arrays ---
const SERVICES = [
  "Pet Care",
  "Makeup",
  "Plumbing",
  "Cleaning",
  "Gardening",
  "Electrical",
  "Painting",
  "Carpentry",
  "Moving",
  "Tutoring",
  "Photography",
  "Catering",
];

const PAYMENT_TYPES = ["Cash", "Card", "Mobile Money", "Wallet"];
const STATUSES = ["new", "accepted", "in-process", "completed", "rejected"];

const ADDRESSES = [
  "7958 Swift Village, Chicago, US",
  "123 Maple Street, Austin, TX",
  "456 Oak Avenue, Seattle, WA",
  "789 Pine Road, Miami, FL",
  "101 Birch Lane, Denver, CO",
  "202 Cedar Blvd, San Francisco, CA",
  "303 Elm Street, New York, NY",
  "404 Spruce Way, Boston, MA",
];

const FIRST_NAMES = [
  "Tami",
  "John",
  "Sarah",
  "Michael",
  "Emma",
  "James",
  "Olivia",
  "Robert",
  "Sophia",
  "William",
  "Ava",
  "David",
];
const LAST_NAMES = [
  "Schaefer",
  "Doe",
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];
const PHONES = [
  "+254701694004",
  "+254722111222",
  "+254733333444",
  "+254744555666",
  "+254755777888",
  "+254766999000",
];

const ITEM_NAMES = [
  "Concealer",
  "Foundation",
  "Lipstick",
  "Mascara",
  "Blender",
  "Brush Set",
  "Powder",
  "Highlighter",
];
const SERVICE_CATEGORIES = ["Makeup", "Skincare", "Hair", "Nails"];

// --- Helper Functions ---
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateOrderItems = () => {
  const numCategories = randomInt(1, 2);
  const result = [];
  for (let i = 0; i < numCategories; i++) {
    const category = pickRandom(SERVICE_CATEGORIES);
    const numItems = randomInt(1, 3);
    const items = [];
    for (let j = 0; j < numItems; j++) {
      items.push({
        name: pickRandom(ITEM_NAMES),
        quantity: randomInt(1, 3),
        price: randomInt(100, 500),
      });
    }
    result.push({ name: category, items });
  }
  return result;
};

const generateCustomer = (index) => {
  const firstName = pickRandom(FIRST_NAMES);
  const lastName = pickRandom(LAST_NAMES);
  return {
    name: `${firstName} ${lastName}`,
    phone: pickRandom(PHONES),
    image: `https://i.pravatar.cc/150?img=${index + 10}`, // Random unique avatar
    userId: `user_${Math.random().toString(36).substring(2, 10)}`,
  };
};

const generateBookingDate = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() - offsetDays);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const time = `${String(randomInt(8, 10)).padStart(2, "0")}:${String(randomInt(0, 59)).padStart(2, "0")} ${pickRandom(["AM", "PM"])} - ${String(randomInt(1, 6)).padStart(2, "0")}:${String(randomInt(0, 59)).padStart(2, "0")} ${pickRandom(["AM", "PM"])}`;
  return `${formattedDate}, ${time}`;
};

// --- Main Generator ---
const generateDummyOrders = () => {
  const orders = [];

  for (let i = 0; i < NUM_ORDERS; i++) {
    const service = pickRandom(SERVICES);
    const status = pickRandom(STATUSES);
    const dayOffset = randomInt(0, 30);
    const orderItems = generateOrderItems();
    const totalPrice = orderItems.reduce((acc, cat) => {
      return (
        acc +
        cat.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      );
    }, 0);
    const tax = Math.round(totalPrice * 0.08); // 8% tax roughly

    const order = {
      id: `order_${Date.now()}_${i}`, // Friendly ID, Firestore will overwrite if using addDoc
      service: service,
      serviceImage: `https://picsum.photos/seed/${service.replace(" ", "")}/200/200`,
      paymentType: pickRandom(PAYMENT_TYPES),
      orderId: Math.floor(100000000 + Math.random() * 900000000),
      bookingDate: generateBookingDate(dayOffset),
      price: totalPrice,
      status: status,
      deliveryAddress: pickRandom(ADDRESSES),
      deliveryTime: generateBookingDate(dayOffset), // Same as booking or slightly later
      bookingID: `BK${randomInt(100000, 999999)}`,
      providerId: PROVIDER_ID, // FIXED PROVIDER ID
      customer: generateCustomer(i),
      tax: tax,
      order: orderItems,
    };

    orders.push(order);
  }

  return orders;
};

// --- Execute ---
const dummyOrders = generateDummyOrders();

// 1. LOG to console (copy this JSON directly into Firestore console "Add Document")
console.log(JSON.stringify(dummyOrders, null, 2));

// 2. Push to Firestore
const pushOrdersToFirestore = async () => {
  const batch = writeBatch(db);
  const colRef = collection(db, "orders");

  dummyOrders.forEach((order) => {
    const docRef = doc(colRef);
    batch.set(docRef, order);
  });

  await batch.commit();
  console.log(`✅ Successfully uploaded ${dummyOrders.length} orders!`);
};

pushOrdersToFirestore().catch(console.error);
