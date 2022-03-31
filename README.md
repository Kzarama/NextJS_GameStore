# GameStore

Made with:

-   [Strapi](https://strapi.io/)
-   [Stripe](https://stripe.com/)
-   [NextJS](https://nextjs.org/)
-   [MongoDB atlas](https://www.mongodb.com/atlas/database)
-   [S3](https://aws.amazon.com/es/s3/)

# Security

According to OWASP

## Injection

-   Avoid use the interpreter directly.
-   Use ORM: Prisma, TypeORM.
-   Validate entries: class-validator.

## Broken authentication

-   Strong passwords.
-   Password recovery.
-   2FA, captcha.
-   OAuth, OpenID

Save JWT in sessionStorage and add a Fingerprint for protection against XSS.

## Sensitive Data Exposure

Limit the time of the session, the closer to 0 the better.

Perform signing and authentication of used tokens.

In the next authentication, create a custom secret, signin key, and encryption key and specify them in the next authentication configuration in jwt section, Example:

```javascript
...
  jwt: {
    secret: ...,
    signingKey: ...,
    encryption: true,
    encryptionKey: ...,
    verificationOptions: {
      algorithms: [""],
    },
    decryptionOptions = {
      algorithms: [""],
    },
  },
...
```

## Cross-Site Scripting XSS

Embed code in frontend by a third party.

-   Add type in number help.
-   Validate data with Yup.
-   Clean the data removing all special characters ([sanitize-html](https://www.npmjs.com/package/sanitize-html)).

## Additional care

In the code:

-   Use:

    -   node.textContent
    -   node.innerText (not so recomended)

-   Don´t use:

    -   eval
    -   document.write, innerHTML, outerHTML
