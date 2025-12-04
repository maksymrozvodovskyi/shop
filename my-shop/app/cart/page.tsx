"use client";

import { checkout } from "@/lib/api/orders";
import { useCartStore } from "@/lib/store/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SHIPPING_FIELDS = [
  { key: "fullName", label: "Full Name" },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
  { key: "postalCode", label: "Postal Code" },
  { key: "addressLine", label: "Address" },
  { key: "phone", label: "Phone" },
] as const;

type ShippingFieldKey = (typeof SHIPPING_FIELDS)[number]["key"];

type ShippingForm = Record<ShippingFieldKey, string>;

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, total, clearCart } =
    useCartStore();

  const [form, setForm] = useState<ShippingForm>({
    fullName: "",
    country: "",
    city: "",
    postalCode: "",
    addressLine: "",
    phone: "",
  });

  if (!items.length) {
    return (
      <p className="text-center py-10 text-gray-600 text-lg">
        Your cart is empty
      </p>
    );
  }

  const handleCheckout = async () => {
    const payload = {
      total: total(),
      shippingAddress: form,
      items: items.map((i) => ({
        quantity: i.quantity,
        price: i.price,
        product: i.documentId,
      })),
    };

    try {
      await checkout(payload);
      clearCart();
      router.push("/orders");
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const updateField = (field: ShippingFieldKey, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {items.map((item) => (
        <div
          key={item.documentId}
          className="flex justify-between items-center border p-4 rounded-lg bg-white"
        >
          <div>
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-blue-600 font-bold">${item.price}</p>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.documentId, Number(e.target.value))
                }
                className="w-16 border rounded p-1"
              />
              <button
                onClick={() => removeItem(item.documentId)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <p className="text-xl font-bold">
        Total: <span className="text-blue-600">${total()}</span>
      </p>

      <div className="bg-white p-4 rounded-lg border space-y-3">
        <h2 className="font-semibold text-lg">Shipping Address</h2>

        {SHIPPING_FIELDS.map(({ key, label }) => (
          <input
            key={key}
            type="text"
            placeholder={label}
            value={form[key]}
            onChange={(e) => updateField(key, e.target.value)}
            className="border rounded w-full p-2"
          />
        ))}
      </div>

      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white px-6 py-3 rounded-lg w-full text-center text-lg"
      >
        Checkout
      </button>
    </div>
  );
}
