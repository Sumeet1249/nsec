import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col overflow-x-hidden">
      <Header />
      <Navbar />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-500 pt-[186px]">
        <main className="flex-1 relative">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
