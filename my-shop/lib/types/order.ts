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
  productId: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  id: number;
  orderId: string;
  total: number;
  orderStatus: string;
  shippingAddress: ShippingAddressType;
  items: OrderItemType[];
};
