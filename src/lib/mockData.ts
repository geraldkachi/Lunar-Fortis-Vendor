import type { Booking, Transaction, Product, TeamUser, TrackingStep } from "@/types";

export const formatPrice = (n: number) => `₦ ${n.toLocaleString("en-NG")}`;

const baseTracking: TrackingStep[] = [
  { key: "initiated", label: "Booking Initiated", time: "Jan 18, 9:11 AM", completed: true },
  { key: "received", label: "Booking Received by Vendor", time: "Jan 18, 9:11 AM", completed: true },
  { key: "accepted", label: "Booking Accepted", time: "Jan 18, 9:11 AM", completed: true },
  { key: "payment", label: "Payment Successful", time: "Jan 18, 9:15 AM", completed: true },
  { key: "success", label: "Booking Successful", time: "Jan 18, 9:11 AM", completed: true },
];

const declinedTracking: TrackingStep[] = [
  { key: "initiated", label: "Booking Initiated", time: "Jan 18, 9:11 AM", completed: true },
  { key: "received", label: "Booking Received by Vendor", time: "Jan 18, 9:11 AM", completed: true },
  { key: "declined", label: "Booking Declined", time: "Jan 18, 9:11 AM", completed: true },
  { key: "payment", label: "Payment Successful", time: "", completed: false },
  { key: "success", label: "Booking Successful", time: "", completed: false },
];

const ongoingTracking: TrackingStep[] = [
  { key: "initiated", label: "Booking Initiated", time: "Jan 18, 9:11 AM", completed: true },
  { key: "received", label: "Booking Received by Vendor", time: "Jan 18, 9:11 AM", completed: true },
  { key: "accepted", label: "Booking Accepted", time: "Jan 18, 9:11 AM", completed: true },
  { key: "payment", label: "Payment Successful", time: "", completed: false },
  { key: "success", label: "Booking Successful", time: "", completed: false },
];

export const BOOKINGS: Booking[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  bookingId: "BKG123456-2N",
  product: i % 3 === 0 ? "Studio Apartment" : "2 Bedroom Apartment",
  amount: i % 2 === 0 ? 250000000 : 206000000,
  status: i === 0 ? "completed" : i === 4 ? "pending" : i === 6 ? "declined" : "ongoing" as any,
  date: i === 0 ? "09 April 2026, 10:45 AM" : "Jan 18, 2026 · 14:32",
  orderId: "#BKG123456-2N",
  createdDate: "09 April 2026, 10:45 AM",
  location: "Lekki Peninsula",
  checkInDate: "09 April 2026",
  checkOutDate: "10 April 2026",
  checkInTime: "12:00 PM",
  numberOfDays: 2,
  totalBilling: 194000,
  pricePerDay: 97000,
  productType: "accommodation",
  trackingProgress: i === 6 ? declinedTracking : i === 4 ? ongoingTracking : baseTracking,
}));

export const TRANSACTIONS: Transaction[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  bookingId: "BKG123456-2N",
  user: ["Tolulope Afolayan", "Andrew Phillip", "Gregory Allan", "Adeleleke John", "Admin", "Jonathan Peace"][i % 6],
  amount: [250000000, 95000000, 206000000, 206000000, 95000000][i % 5],
  type: i === 4 ? "Withdrawal" : "Credit",
  status: i === 1 ? "failed" : "successful",
  date: "Jan 18, 2026 · 14:32",
}));

export const PRODUCTS: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  name: i % 2 === 0 ? "2 Bedroom Apartment" : "Studio Apartment",
  location: i % 2 === 0 ? "Lekki" : "Yaba",
  amount: i % 2 === 0 ? 185000000 : 90000000,
  status: i < 8 ? "active" : "inactive",
  createdDate: "Jan 18, 2026 · 14:32",
  type: "accommodation",
  serviceDetails: "Fully Furnished Single Room Shortlet for Rent ?? Location: Agungi, Lekki, Lagos Easily accessible via Osapa London ?? Rate: ₦40,000 per day ? Open to Long Stay Features: • Private Kitchen • Toilet & Bathroom • Water Heater • Microwave • 24/7 Water Supply • 24/7 Electricity • Air Conditioner • Netflix • Gym • Football Pitch Available for shortlet and long stay.",
  images: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80",
  ],
  guests: 4,
  amenities: ["Wifi", "24hr Light"],
}));

export const TEAM_USERS: TeamUser[] = [
  { id: "1", name: "Tolulope Mosvar", email: "tolulope103@gmail.com", role: "admin", status: "active", lastActive: "08 April 2026, 10:45 AM" },
  { id: "2", name: "Andrew Philip", email: "tolulope103@gmail.com", role: "admin", status: "active", lastActive: "08 April 2026, 10:45 AM" },
  { id: "3", name: "Jonathan Peace", email: "tolulope103@gmail.com", role: "admin", status: "active", lastActive: "08 April 2026, 10:45 AM" },
  { id: "4", name: "Gregory Allan", email: "tolulope103@gmail.com", role: "admin", status: "disabled", lastActive: "08 April 2026, 10:45 AM" },
];

export const MOCK_RECEIPT = {
  amount: 250000000,
  recipient: "Tolulope Afolayan",
  recipientBank: "Paycom/OPAY",
  accountNumber: "8123235569",
  description: "Tolulope Afolayan to Flutterwave/LunaFORTIS",
  date: "09 April 2026, 10:45 AM",
  status: "successful" as const,
  transactionRef: "pocket_disburse_1155470048562623",
  sessionId: "090405280430150036372237066022",
};
