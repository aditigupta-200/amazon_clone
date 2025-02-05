// import { createContext, useState, useContext, ReactNode } from 'react';

// interface User {
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (user: User) => {
//     setUser(user);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { name: string } | null;
  login: (userData: { name: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const login = (userData: { name: string }) => {
    setUser(userData); // Store user data after login
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, login, logout } = context;

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
};
