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

// Create a client for your API
const { apiGet, apiPost, apiPut, apiDelete } = createApiClient("http://localhost:2000");

async function main() {
  try {
    // Get all items
    const items = await apiGet("/items");
    console.log("All items:", items);

    // Create a new item
    const createdItem = await apiPost("/items", { name: "New Item", price: 9.99 });
    console.log("Created item:", createdItem);

    // Update the created item
    const updatedItem = await apiPut(`/items/${createdItem.id}`, { name: "Updated Item", price: 12.99 });
    console.log("Updated item:", updatedItem);

    // Delete the item
    const deletedItem = await apiDelete(`/items/${createdItem.id}`);
    console.log("Deleted item:", deletedItem);

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes or new features.

---

## License

MIT © Matrax