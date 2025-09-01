# quickapi-ts-client

![npm](https://img.shields.io/npm/v/quickapi-ts-client?color=blue) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/quickapi-ts-client) ![typescript](https://img.shields.io/badge/TypeScript-Yes-blue) ![License](https://img.shields.io/npm/l/quickapi-ts-client)

A simple **TypeScript API client** wrapper around Axios for making HTTP requests easily, with fully typed responses and centralized error handling.

---

## Features

* Easy-to-use API methods: `apiGet`, `apiPost`, `apiPut`, `apiDelete`
* Fully typed with TypeScript
* Supports custom base URLs
* Centralized and consistent error handling
* Lightweight and dependency-free except Axios

---

## Installation

```bash
npm install quickapi-ts-client
# or
yarn add quickapi-ts-client
```

---

## Quick Start

```ts
import { createApiClient } from "quickapi-ts-client";

const { apiGet, apiPost, apiPut, apiDelete } = createApiClient("http://localhost:2000");

async function main() {
  try {
    const bots = await apiGet("/bots");
    console.log("All bots:", bots);

    const created = await apiPost("/bots", { name: "My Bot" });
    console.log("Created bot:", created);

    const updated = await apiPut(`/bots/${created.id}`, { name: "Updated Bot" });
    console.log("Updated bot:", updated);

    const deleted = await apiDelete(`/bots/${created.id}`);
    console.log("Deleted bot:", deleted);

  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

main();
```

---

## API

### `createApiClient(baseURL: string)`

Creates a new API client instance with a custom base URL.

Returns an object with:

* `apiGet<T = any>(endpoint: string, params?: object): Promise<T | ApiError>`
* `apiPost<T = any>(endpoint: string, body?: object): Promise<T | ApiError>`
* `apiPut<T = any>(endpoint: string, body?: object): Promise<T | ApiError>`
* `apiDelete<T = any>(endpoint: string): Promise<T | ApiError>`

### `ApiError`

All errors are standardized in this format:

```ts
interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}
```

> Note: All API methods return either the response data (`T`) or an `ApiError`. You should handle errors accordingly.

---

## Error Handling Examples

```ts
const { apiGet } = createApiClient("http://localhost:2000");

async function getBots() {
  const response = await apiGet("/bots");

  if ("status" in response && response.status >= 400) {
    console.error(`API Error (${response.status}): ${response.message}`);
    return;
  }

  console.log("Bots:", response);
}
```

---

## Development

```bash
# Clone repository
git clone https://github.com/matrax123/clientAPI.git
cd clientAPI

# Install dependencies
npm install

# Build TypeScript
npm run build

# Optionally, link package locally for testing
npm link
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes or new features.

---

## License

MIT © Matrax