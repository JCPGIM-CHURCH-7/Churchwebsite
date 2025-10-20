import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ministry Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Jesus Christ Power of Glory International Ministries
            </h3>
            <p className="text-gray-400">
              Spreading the message of faith, hope, and love across the globe.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/daily-messages"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Daily Messages
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4 text-white">Stay Connected</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive daily messages and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 justify-center md:justify-end">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Subscribe
              </Button>
            </form>
            <div className="flex justify-center md:justify-end gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Jesus Christ Power of Glory International Ministries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;