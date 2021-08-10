# Reading Habit

A fullstack Jamstack app to help you keep track of the books you're reading.

Built with:

- [Next.js](https://nextjs.org/) for UI, routing and serverless functions
- [FaunaDB](https://fauna.com/) for cloud-based data storage
- [Auth0](https://auth0.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling

[Try it out for yourself](https://reading-habit.vercel.app/)

Originally inspired by James Q Quick's [Fullstack Jamstack tutorial](https://youtu.be/TNKzKtNTjls)

![Screenshot of Reading Habit app](https://res.cloudinary.com/gerhynes/image/upload/q_auto/f_auto/v1628504384/reading-habit_eworov.png)

### To run locally

1. Clone this repo.

2. Install dependencies with `npm install`.

3. In the root of the project, add a `.env.local` file with the following keys

```js
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
FAUNA_SECRET=
```

4. Follow the [Auth0 Next.js Quickstart](https://auth0.com/docs/quickstart/webapp/nextjs) to see how to set up Auth0 with Next.js.

5. Follow the [FaunaDB quickstart](https://docs.fauna.com/fauna/current/start/) to set up a FaunaDB database. Under Security, create a new key, associate it with the database, and give it the role of `server`.

6. Once you have your Auth0 and FaunaDB secrets, add them to `.env.local` and run `npm run dev` to spin up a local version of the app.
