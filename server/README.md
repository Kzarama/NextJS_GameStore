# GameStore

Server for a game store made with strapi, database in mongodb atlas, S3 for images and stripe for payment.

## Payment with Stripe

Install stripe

```console
yarn add stripe
```

And in `api\order\controllers\order.js` change for manage integration with stripe.

Run project with yarn:

```console
yarn develop
```

Or npm:

```console
npm i develop
```
