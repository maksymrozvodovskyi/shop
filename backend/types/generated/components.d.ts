import type { Schema, Struct } from '@strapi/strapi';

export interface OrderShippingAddress extends Struct.ComponentSchema {
  collectionName: 'components_order_shipping_addresses';
  info: {
    displayName: 'shippingAddress';
  };
  attributes: {
    addressLine: Schema.Attribute.String;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    fullName: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.shipping-address': OrderShippingAddress;
    }
  }
}
