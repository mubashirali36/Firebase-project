import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#F0F0F0] pt-20 pb-10 relative mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mb-32 z-20">
        <div className="bg-black rounded-[20px] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2 className="text-white text-3xl sm:text-4xl font-black max-w-xl leading-tight text-center lg:text-left">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="flex flex-col w-full lg:w-auto gap-3">
            <div className="relative flex items-center w-full sm:w-[350px]">
              <Mail className="absolute left-4 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full py-3.5 pl-12 pr-4 rounded-full bg-white text-black outline-none text-sm placeholder-gray-400 font-medium"
              />
            </div>
            <button className="w-full sm:w-[350px] bg-white text-black py-3.5 rounded-full font-medium hover:bg-gray-100 transition text-sm">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F0F0] pt-40 pb-12 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-black tracking-tight mb-4">SHOP.CO</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>


          <div>
            <h4 className="font-bold text-sm tracking-widest mb-4">COMPANY</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-black transition">About</a></li>
              <li><a href="#" className="hover:text-black transition">Features</a></li>
              <li><a href="#" className="hover:text-black transition">Works</a></li>
              <li><a href="#" className="hover:text-black transition">Career</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-widest mb-4">HELP</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-black transition">Customer Support</a></li>
              <li><a href="#" className="hover:text-black transition">Delivery Details</a></li>
              <li><a href="#" className="hover:text-black transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-widest mb-4">FAQ</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-black transition">Account</a></li>
              <li><a href="#" className="hover:text-black transition">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-black transition">Orders</a></li>
              <li><a href="#" className="hover:text-black transition">Payments</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-widest mb-4">RESOURCES</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-black transition">Free eBooks</a></li>
              <li><a href="#" className="hover:text-black transition">Development Tutorial</a></li>
              <li><a href="#" className="hover:text-black transition">How to - Blog</a></li>
              <li><a href="#" className="hover:text-black transition">Youtube Playlist</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">Shop.co © 2000-{year}. All Rights Reserved</p>

        <div className="flex items-center gap-2">
          <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 flex items-center justify-center shadow-sm">
            <span className="text-blue-700 font-black italic tracking-tighter text-sm">VISA</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 flex items-center justify-center shadow-sm">
            <div className="flex -space-x-1.5 items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-80"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 opacity-80"></div>
            </div>
            <span className="text-[10px] font-bold text-gray-700 ml-1">mastercard</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 flex items-center justify-center shadow-sm">
            <span className="text-blue-600 font-bold italic text-xs">Pay<span className="text-blue-400">Pal</span></span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 flex items-center justify-center shadow-sm">
            <span className="text-black font-bold text-xs flex items-center gap-0.5"> Pay</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 flex items-center justify-center shadow-sm">
            <span className="text-gray-800 font-bold text-xs">G<span className="text-blue-505">P</span><span className="text-red-500">a</span><span className="text-yellow-500">y</span></span>
          </div>
        </div>
      </div>

    </footer>
  );
}