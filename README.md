# D-Lock

Lock your secret and keep safe, with password try [d-lock.vercel.app](https://d-lock.vercel.app)

## Get started

Install and try...

```bash
npm install
npm run dev
```

or with yarn

```bash
yarn install
yarn dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running.

*Note: Check out [Svelte](https://svelte.dev/) for more information.*

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

or with yarn

```bash
yarn build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
