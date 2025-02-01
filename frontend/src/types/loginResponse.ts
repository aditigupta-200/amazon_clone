interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    // Add other fields if present in the user object
  };
}
