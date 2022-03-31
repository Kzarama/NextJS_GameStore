import type { NextApiHandler } from 'next'

const credentialsAuth: NextApiHandler = (request, response) => {
  if (request.method !== "POST") {
    response.status(405).end();
    return;
  };

  if (request.body.password === process.env.AUTH_SECRET) {
    const platziUser: { name: string, email: string, image: string } = {
      name: "custom oauth",
      email: "student@gmail.com",
      image: "",
    };
    return response.status(200).json(platziUser);
  };
  response.status(401).end();
};

export default credentialsAuth;
