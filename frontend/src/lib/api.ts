const API_BASE_URL = "http://localhost:3001/api/v1";

export interface Product {
  id: string;
  name: string;
  image: string;
  availableStock: number;
  price: number;
}

export interface Reservation {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  quantity: number;
  status: "PENDING" | "COMPLETED" | "EXPIRED";
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ReserveRequest {
  productId: string;
  clientId: string;
  userName: string;
}

export type ReserveResponse = ApiResponse<Reservation>;

export interface PurchaseRequest {
  userId: string;
  reservationId: string;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function reserveProduct(
  data: ReserveRequest,
): Promise<ReserveResponse> {
  const response = await fetch(`${API_BASE_URL}/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMsg = "Failed to reserve product";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch (parseError) {
      // Ignore JSON parse errors and use default message
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export interface CreateProductRequest {
  name: string;
  photoUrl?: string;
  totalStock: number;
  price: number;
  endTime: string;
}

export async function createProduct(
  data: CreateProductRequest,
): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMsg = "Failed to create product";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  const result = await response.json();
  return result.data;
}

export async function purchaseProduct(
  data: PurchaseRequest,
): Promise<PurchaseResponse> {
  const response = await fetch(`${API_BASE_URL}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMsg = "Failed to purchase product";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  return response.json();
}
