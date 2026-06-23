export type BookingStatus = "pending" | "ongoing" | "completed" | "declined" | "failed";
export type TransactionStatus = "successful" | "failed" | "pending";
export type ProductStatus = "active" | "inactive";
export type UserStatus = "active" | "disabled";
export type UserRole = "admin" | "user";
export type ProductType = "accommodation" | "car" | "security";

export interface Transaction {
  id: string;
  bookingId: string;
  user: string;
  amount: number;
  type: "Credit" | "Withdrawal";
  status: TransactionStatus;
  date: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  product: string;
  amount: number;
  status: BookingStatus;
  date: string;
  // detail fields
  orderId?: string;
  createdDate?: string;
  location?: string;
  checkInDate?: string;
  checkOutDate?: string;
  checkInTime?: string;
  numberOfDays?: number;
  totalBilling?: number;
  trackingProgress?: TrackingStep[];
  productType?: ProductType;
  pricePerDay?: number;
}

export interface TrackingStep {
  key: string;
  label: string;
  time?: string;
  completed: boolean;
}

export interface Product {
  id: string;
  name: string;
  location: string;
  amount: number;
  status: ProductStatus;
  createdDate: string;
  type: ProductType;
  serviceDetails?: string;
  images?: string[];
  guests?: number;
  amenities?: string[];
  color?: string;
  fuel?: string;
  transmission?: string;
}

export interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
}

export interface TransactionReceipt {
  amount: number;
  recipient: string;
  recipientBank: string;
  accountNumber: string;
  description: string;
  date: string;
  status: TransactionStatus;
  transactionRef: string;
  sessionId: string;
}

export interface OnboardingData {
  // Business Details
  registeredBusinessName: string;
  rcNumber: string;
  taxId: string;
  rcNumber2: string;
  dateOfRegistration: string;
  businessAge: string;
  businessType: string;
  sourceOfFunds: string;
  monthlyTransactionVolume: string;
  // Address
  businessAddress: string;
  state: string;
  city: string;
  companyWebsite: string;
  email: string;
  phone: string;
}
