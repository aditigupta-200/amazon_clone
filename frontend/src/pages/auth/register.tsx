import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try {
const { data } = await axios.post('http://localhost:5001/api/auth/register', { name, email, password,role });
  alert('Registration successful');
  router.push('/auth/login');
} catch (error: any) {
  if (error.response && error.response.data) {
    alert(error.response.data.message); // Show backend error message
  } else {
    alert('An unknown error occurred');
  }
}
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-sm mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black cursor-pointer" onClick={handleLogin}>amazon</h1>
        </div>
        
        {/* Registration Box */}
        <div className="bg-white p-6 rounded shadow-md border border-gray-300">
          <h2 className="text-2xl font-normal mb-4">Create account</h2>
          
          <form onSubmit={handleSubmit}>
            {/* New Role Selection */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">
                Are you a buyer or seller?
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
                className="w-full p-2 border border-gray-400 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                required
              >
                <option value="user">Buyer</option>
                <option value="admin">Seller</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">
                Your name
              </label>
              <input
                type="text"
                placeholder="First and last name"
                className="w-full p-2 border border-gray-400 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                className="w-full p-2 border border-gray-400 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-gray-600 mt-1">
                Passwords must be at least 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium p-2 rounded shadow-sm focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Create your Amazon account
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            By creating an account, you agree to Amazon's{' '}
            <a href="#" className="text-blue-600 hover:text-yellow-600 hover:underline">Conditions of Use</a> and{' '}
            <a href="#" className="text-blue-600 hover:text-yellow-600 hover:underline">Privacy Notice</a>.
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300">
            <p className="text-sm">
              Already have an account?{' '}
              <button 
                onClick={handleLogin}
                className="text-blue-600 hover:text-yellow-600 hover:underline bg-transparent border-none p-0"
              >
                Sign in
              </button>
            </p>
          </div>
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

export default RegisterPage;