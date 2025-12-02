"use client";

import { useOrders } from "@/lib/hooks/useOrders";

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders();

  if (isLoading) return <p className="text-center py-6">Loading...</p>;

  if (isError)
    return (
      <p className="text-center py-6 text-red-600">Error loading orders</p>
    );

  if (!orders?.length) return <p className="text-center py-6">No orders yet</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Order #{order.documentId}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-full font-medium
                  ${
                    order.orderStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.orderStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold">
                Total: <span className="text-blue-600">${order.total}</span>
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
              <div className="text-gray-700 space-y-1">
                <p>{order.shippingAddress.fullName}</p>
                <p>
                  {order.shippingAddress.addressLine},{" "}
                  {order.shippingAddress.city}
                </p>
                <p>
                  {order.shippingAddress.country},{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Products</h3>
              <ul className="space-y-3">
                {order.order_items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">${item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
