import React, { useState } from 'react';
import { BRAND_INFO, SOCIAL_CHANNELS } from '../data/socials';
import { SocialPlatformIcon, WhatsAppIcon } from './SocialIcons';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWhatsAppModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenWhatsAppModal,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const menuItems = [
    { label: 'Collections & Catalog', id: 'collections' },
    { label: 'Luxury Lawn', id: 'luxury-lawn' },
    { label: 'Festive Prêt', id: 'festive-pret' },
    { label: 'Home Couture & Bed Linen', id: 'home-couture' },
    { label: 'Official Social Media Hub', id: 'social-hub' },
    { label: 'Contact & Store Info', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Top Utility Strip */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />

            <span className="font-normal text-stone-300 truncate">
              Fast Delivery Across Pakistan & Worldwide
            </span>

            <span className="hidden sm:inline text-stone-500">·</span>

            <span className="hidden sm:inline text-stone-300 whitespace-nowrap">
              Custom Stitching Available
            </span>
          </div>

          <a
            href={BRAND_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-stone-300 hover:text-emerald-400 transition-colors shrink-0"
            title="Direct WhatsApp Helpline"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />

            <span className="font-medium text-[11px] sm:text-xs">
              <span className="hidden sm:inline">Order Helpline: </span>
              {BRAND_INFO.whatsappNumber}
            </span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-serif text-xl sm:text-3xl font-bold tracking-wider text-stone-900 hover:opacity-75 transition-opacity whitespace-nowrap"
        >
          Ecommerce Store
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-700">
          {[
            { label: 'Collections', id: 'collections' },
            { label: 'Luxury Lawn', id: 'luxury-lawn' },
            { label: 'Festive Prêt', id: 'festive-pret' },
            { label: 'Home Linen', id: 'home-couture' },
            { label: 'Official Socials', id: 'social-hub' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative py-2 hover:text-emerald-800 transition-colors duration-300 cursor-pointer group"
            >
              {item.label}

              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-700 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-1 border-r border-stone-200 pr-3">
            {SOCIAL_CHANNELS.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${channel.name} (${channel.handle})`}
                aria-label={`Ecommerce Store on ${channel.name}`}
                className="p-1.5 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                <SocialPlatformIcon
                  platformId={channel.id}
                  className="w-4 h-4"
                />
              </a>
            ))}
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={onOpenWhatsAppModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            title="Chat directly on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
            <span className="whitespace-nowrap">Order on WhatsApp</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Bag"
            className="relative p-2 text-stone-800 hover:text-emerald-800 rounded-full hover:bg-stone-100 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 bg-stone-900 text-white text-[11px] font-bold rounded-full tabular-nums animate-in zoom-in duration-200">
                {cartCount}
              </span>
            )}
          </button>

          {/* Animated Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-xl text-stone-800 hover:bg-stone-100 transition-colors duration-300 cursor-pointer"
          >
            <span className="relative flex flex-col items-center justify-center w-6 h-6">
              <span
                className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? 'rotate-45'
                    : '-translate-y-2'
                }`}
              />

              <span
                className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-200 ease-in-out ${
                  mobileMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'opacity-100 scale-100'
                }`}
              />

              <span
                className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? '-rotate-45'
                    : 'translate-y-2'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden overflow-hidden border-t border-stone-200 bg-[#FAF9F6] transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? 'max-h-[85vh] opacity-100 visible'
            : 'max-h-0 opacity-0 invisible border-t-transparent'
        }`}
      >
        <div
          className={`px-5 sm:px-6 py-6 max-w-7xl mx-auto transition-all duration-500 ease-out ${
            mobileMenuOpen
              ? 'translate-y-0 scale-100'
              : '-translate-y-4 scale-[0.98]'
          }`}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={() => handleNavClick(item.id)}
                style={{
                  transitionDelay: mobileMenuOpen
                    ? `${index * 65}ms`
                    : '0ms',
                }}
                className={`group flex items-center justify-between w-full text-left px-4 py-3.5 rounded-xl text-sm sm:text-base font-medium text-stone-800 hover:text-emerald-900 hover:bg-emerald-50 transition-all duration-300 ${
                  mobileMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-5 opacity-0'
                }`}
              >
                <span>{item.label}</span>

                <svg
                  className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div
            style={{
              transitionDelay: mobileMenuOpen ? '250ms' : '0ms',
            }}
            className={`mt-5 pt-5 border-t border-stone-200 transition-all duration-500 ${
              mobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
              Connect with Ecommerce Store
            </p>

            <div className="grid grid-cols-2 gap-2">
              {SOCIAL_CHANNELS.map((channel, index) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  style={{
                    transitionDelay: mobileMenuOpen
                      ? `${300 + index * 60}ms`
                      : '0ms',
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl bg-stone-100 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-stone-800 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                    mobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-3 opacity-0'
                  }`}
                >
                  <SocialPlatformIcon
                    platformId={channel.id}
                    className="w-4 h-4 shrink-0"
                  />

                  <span className="truncate">{channel.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* WhatsApp Contact Button */}
          <div
            style={{
              transitionDelay: mobileMenuOpen ? '450ms' : '0ms',
            }}
            className={`mt-4 transition-all duration-500 ${
              mobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            <a
              href={BRAND_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-lg hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M7 7h10v10"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Footer */}
          <p
            className={`text-center text-[11px] text-stone-400 mt-5 transition-opacity duration-500 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Ecommerce Store · Shopping made simple
          </p>
        </div>
      </div>
    </header>
  );
};