import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<LoginResponse>('http://localhost:5001/api/auth/login', { email, password });
       localStorage.setItem('token', data.token);
      login(data.user); // Update the user context
      alert('Login successful');
      router.push('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-sm mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">amazon</h1>
        </div>
        
        {/* Login Box */}
        <div className="bg-white p-6 rounded shadow-md border border-gray-300">
          <h2 className="text-2xl font-normal mb-4">Sign in</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-400 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between">
                <label className="block text-sm font-bold mb-1">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-yellow-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-400 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium p-2 rounded shadow-sm focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">New to Amazon?</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/auth/register')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-sm font-medium p-2 rounded border border-gray-300 shadow-sm"
          >
            Create your Amazon account
          </button>
        </div>
        
        {/* Footer Links */}
        <div className="mt-4 text-xs text-center space-x-4 text-blue-600">
          <a href="#" className="hover:text-yellow-600 hover:underline">Conditions of Use</a>
          <a href="#" className="hover:text-yellow-600 hover:underline">Privacy Notice</a>
          <a href="#" className="hover:text-yellow-600 hover:underline">Help</a>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-600">
          © 1996-2025, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default LoginPage;