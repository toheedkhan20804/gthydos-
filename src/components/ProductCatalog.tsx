
import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { createWhatsAppOrderLink } from '../data/socials';
import { WhatsAppIcon } from './SocialIcons';




const PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'Premium Lawn Suit',
    category: 'Luxury Lawn',
    description: 'Premium three-piece unstitched lawn suit.',
    fabric: 'Premium Lawn',
    pieces: '3 Piece',
    pricePKR: 4500,
    originalPricePKR: 5000,
    image: 'https://tse2.mm.bing.net/th/id/OIP.prUPMsqkJIvBD1s_ef8PtQHaLC?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    sizes: ['Unstitched', 'Small', 'Medium', 'Large'],
    details: [
      'Premium lawn fabric',
      'Elegant printed design',
      'Three-piece collection',
    ],
    isNewArrival: true,
  },

  {
    id: 'SHOES-002',
    name: 'Premium Men Sneakers',
    category: 'Luxury Lawn',
    description: 'Stylish and comfortable sneakers for men.',
    fabric: 'Synthetic Leather',
    pieces: '1 Pair',
    pricePKR: 3500,
    originalPricePKR: 4500,
    image: 'https://th.bing.com/th/id/OIP.-xdu2MNyCf3gf1EwnnBD2QHaE8?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    sizes: ['40', '41', '42', '43', '44', '45'],
    details: [
      'Premium synthetic leather',
      'Comfortable cushioned sole',
      'Anti-slip outsole',
      'Available in sizes 40–45',
    ],
    isNewArrival: true,
  },
];



interface ProductCatalogProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (
    product: Product,
    size: string,
    quantity: number
  ) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = [
    'All',
    'Luxury Lawn',
    'Festive Prêt',
    'Home Couture',
    'Velvet & Silk',
  ];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' ||
        product.category === activeCategory;

      const matchesSearch =
        product.id.toLowerCase().includes(query) ||
        product.name.toLowerCase().includes(query) ||
        product.fabric.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleDirectWhatsAppOrder = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();

    const url = createWhatsAppOrderLink(
      product.name,
      product.pricePKR,
      product.sizes[0] || 'Standard'
    );

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickAdd = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();

    onAddToCart(product, product.sizes[0] || 'Standard', 1);
    setAddedProductId(product.id);

    window.setTimeout(() => {
      setAddedProductId((currentId) =>
        currentId === product.id ? null : currentId
      );
    }, 1500);
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <section
      id="collections"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end">
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-500">
            Curated Autumn / Festive Collection
          </div>

          <h2 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
            Signature Ensembles & Home Couture
          </h2>

          <p className="mt-2 max-w-xl text-sm text-stone-600">
            Explore our collection or contact our stylists on WhatsApp
            for sizing and product information.
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by ID, name or fabric..."
              aria-label="Search products"
              className="w-full rounded-lg border border-stone-200 bg-white py-2.5 pl-9 pr-4 text-xs text-stone-800 placeholder-stone-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-900"
            />

            <svg
              className="absolute left-3 top-3 h-4 w-4 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="scrollbar-none flex items-center gap-2 overflow-x-auto py-6">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
              activeCategory === category
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-8 py-16 text-center">
          <h3 className="font-serif text-xl font-semibold text-stone-900">
            {PRODUCTS.length === 0
              ? 'Your Collection Starts Here'
              : 'No Products Found'}
          </h3>

          <p className="mt-2 text-sm text-stone-500">
            {PRODUCTS.length === 0
              ? 'Add your products in the PRODUCTS array at the top of ProductCatalog.tsx.'
              : `No products found matching "${searchQuery}".`}
          </p>

          {(searchQuery || activeCategory !== 'All') && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 cursor-pointer text-xs font-semibold text-stone-900 underline underline-offset-4"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              onClick={() => onQuickView(product)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {product.isNewArrival && (
                  <span className="absolute left-3 top-3 rounded bg-stone-900/90 px-2 py-1 text-[11px] font-semibold tracking-wide text-white">
                    New Arrival
                  </span>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-stone-950/20 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-lg bg-white/95 px-4 py-2 text-xs font-semibold text-stone-900 shadow-md">
                    Quick View & Sizing
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.pieces}</span>
                  </div>

                  <h3 className="mt-1.5 line-clamp-1 font-serif text-lg font-bold text-stone-900 transition-colors group-hover:text-amber-800">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">
                    {product.description}
                  </p>

                  <p className="mt-2 text-[11px] text-stone-400">
                    Product ID: {product.id}
                  </p>
                </div>

                <div className="space-y-3 border-t border-stone-100 pt-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-base font-bold tabular-nums text-stone-900">
                        PKR {product.pricePKR.toLocaleString()}
                      </span>

                      {product.originalPricePKR != null && (
                        <span className="text-xs tabular-nums text-stone-400 line-through">
                          PKR {product.originalPricePKR.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <span className="whitespace-nowrap text-[11px] font-medium text-emerald-700">
                      In Stock
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={(event) =>
                        handleDirectWhatsAppOrder(event, product)
                      }
                      className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                      title="Order directly on WhatsApp"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      <span className="truncate">WhatsApp Order</span>
                    </button>

                    <button
                      type="button"
                      onClick={(event) => handleQuickAdd(event, product)}
                      className="flex cursor-pointer items-center justify-center rounded-lg bg-stone-100 px-2.5 py-2 text-xs font-medium text-stone-800 transition-colors hover:bg-stone-200"
                    >
                      {addedProductId === product.id ? (
                        <span className="truncate font-semibold text-emerald-700">
                          ✓ Added
                        </span>
                      ) : (
                        <span className="truncate">Add to Bag</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
