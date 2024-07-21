### Step 1: Clone the repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/sajagporwal123/blog-app-frontend.git
cd blog-app-frontend
```

### Step 2: Install dependencies

In your terminal, run the following command to install the necessary dependencies:

```bash
npm install
```

### Step 3: Configure Environment Variables

Update the `src/environments/environment.ts` file with your API URL and Google Client ID. Open `src/environments/environment.ts` and modify it as follows:

```typescript
export const environment = {
  production: false,
  API_URL: "YOUR_API_URL",
  GOOGLE_CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID",
};
```

### Step 4: Serve the application

In your terminal, run the following command to serve the application:

```bash
npm start
```

### Step 5: Running unit tests

To run the unit tests using Jest, use the following command in your terminal:

```bash
npm test
```

### Step 6: Building the application

To build the application for production, run the following command in your terminal:

```bash
npm run build
```
