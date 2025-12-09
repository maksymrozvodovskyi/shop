import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      if (ctx.state.user && ctx.request.body.data) {
        ctx.request.body.data.user = ctx.state.user.id;
      }

      const entity = await strapi.documents("api::order.order").create({
        data: ctx.request.body.data,
        ...ctx.query,
      });

      const publishedEntity = await strapi
        .documents("api::order.order")
        .publish({
          documentId: entity.documentId,
        });

      const sanitizedEntity = await this.sanitizeOutput(publishedEntity, ctx);

      return this.transformResponse(sanitizedEntity);
    },

    async find(ctx) {
      if (ctx.state.user) {
        const populate = ctx.query.populate || "*";
        const publicationState = ctx.query.publicationState || "live";

        const entities = await strapi.entityService.findMany(
          "api::order.order",
          {
            filters: {
              user: {
                id: ctx.state.user.id,
              },
            },
            populate: populate,
            publicationState: publicationState,
          }
        );

        const sanitizedEntities = await this.sanitizeOutput(entities, ctx);

        return this.transformResponse(sanitizedEntities, { meta: {} });
      }

      const { data, meta } = await super.find(ctx);

      return { data, meta };
    },
  })
);
