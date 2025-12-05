export type ShippingAddressType = {
  fullName: string;
  phone: string;
  country: string;
  city: string;
  addressLine: string;
  postalCode: string;
};

export type OrderItemType = {
  id: number;
  quantity: number;
  price: number;
};

export type OrderType = {
  id: number;
  documentId: string;
  total: number;
  orderStatus: string;
  createdAt: string;
  shippingAddress: ShippingAddressType;
  order_items: OrderItemType[];
};
