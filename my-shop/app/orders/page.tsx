"use client";

import { useOrders } from "@/lib/hooks/useOrders";

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders</p>;
  if (!orders?.length) return <p>No orders yet</p>;

  console.log("zxczxczxczxcxc", orders);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h2>Order #{order.documentId}</h2>
          <p>Status: {order.orderStatus}</p>
          <p>Total: {order.total} USD</p>

          <h3>Shipping address:</h3>
          <p>{order.shippingAddress.fullName}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.country}
          </p>
          <p>{order.shippingAddress.addressLine}</p>
          <p>{order.shippingAddress.postalCode}</p>

          <h3>Items:</h3>
          <ul>
            {order.order_items.map((item: any) => (
              <li key={item.id}>
                {item.product?.title || "Product"} × {item.quantity} —{" "}
                {item.price} USD
              </li>
            ))}
          </ul>

          <hr />
        </div>
      ))}
    </div>
  );
}
