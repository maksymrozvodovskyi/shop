import type { Schema, Struct } from '@strapi/strapi';

export interface OrderShippingAddress extends Struct.ComponentSchema {
  collectionName: 'components_order_shipping_addresses';
  info: {
    displayName: 'shippingAddress';
  };
  attributes: {
    addressLine1: Schema.Attribute.String & Schema.Attribute.Required;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.Required;
    fullName: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    postalCode: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.shipping-address': OrderShippingAddress;
    }
  }
}
