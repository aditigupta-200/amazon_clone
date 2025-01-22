// frontend/types.ts


// Type for a User object
export interface User {
  _id: string;
  name: string;
  email: string;
  cart: string[]; // Array of product IDs
}

