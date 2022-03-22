'use strict';
const stripe = require('stripe')(process.env.STRAPI_SECRET_KEY);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { token, products, idUser, addressShipping } = ctx.request.body;
    let totalPayment = 0;
    products.forEach((product) => {
      totalPayment += product.price;
    });
    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: "COP",
      source: token.id,
      description: `Id usuario: ${idUser}`,
    });
    const createOrder = [];
    for await (const product of products) {
      const data = {
        game: product.id,
        user: idUser,
        totalPayment,
        idPayment: charge.id,
        addressShipping,
      };
      const validData = await strapi.entityValidator.validateEntityUpdate(
        strapi.models.order,
        data
      );
      const entry = await strapi.query("order").create(validData);
      createOrder.push(entry);
    };
    return createOrder;
  },
};
