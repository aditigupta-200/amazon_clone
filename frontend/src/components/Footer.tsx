// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const footerLinks = {
    'Get to Know Us': ['About Us', 'Careers', 'Press Releases', 'Amazon Science'],
    'Connect with Us': ['Facebook', 'Twitter', 'Instagram'],
    'Make Money with Us': ['Sell on Amazon', 'Sell under Amazon Accelerator', 'Protect and Build Your Brand', 'Amazon Global Selling'],
    'Let Us Help You': ['COVID-19 and Amazon', 'Your Account', 'Returns Centre', 'Amazon App Download']
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-gray-700 hover:bg-gray-600 py-4 text-center"
      >
        Back to top
      </button>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-300 hover:text-white text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom footer */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="#" className="text-gray-300 hover:text-white">Conditions of Use & Sale</Link>
            <Link href="#" className="text-gray-300 hover:text-white">Privacy Notice</Link>
            <Link href="#" className="text-gray-300 hover:text-white">Interest-Based Ads</Link>
          </div>
          <p className="text-sm text-gray-400">
            © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;