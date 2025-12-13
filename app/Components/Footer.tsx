"use client";
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">Logo</div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-6 justify-center text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-indigo-600">Jobs</a>
          <a href="#" className="hover:text-indigo-600">Careers</a>
          <a href="#" className="hover:text-indigo-600">Talent</a>
          <a href="#" className="hover:text-indigo-600">Hire</a>
          <a href="#" className="hover:text-indigo-600">Grow</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 justify-end text-indigo-600 text-xl">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Bottom Legal Info */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>© 2018 Job Board Platform. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-600">Privacy policy</a>
          <a href="#" className="hover:text-indigo-600">Terms of service</a>
          <a href="#" className="hover:text-indigo-600">Cookie settings</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
