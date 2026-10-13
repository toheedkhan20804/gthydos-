
import React, { useEffect, useState } from 'react';
import type { Product } from '../types';
import { createWhatsAppOrderLink } from '../data/socials';
import { WhatsAppIcon } from './SocialIcons';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: string,
    quantity: number
  ) => void;
}

export const ProductQuickViewModal: React.FC<
  ProductQuickViewModalProps
> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [product]);

  if (!product) return null;

  const handleOrderWhatsApp = () => {
    const url = createWhatsAppOrderLink(
      product.name,
      product.pricePKR * quantity,
      selectedSize
    );

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedNotice(true);

    window.setTimeout(() => {
      setAddedNotice(false);
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/70 p-4 backdrop-blur-sm sm:p-6"
    >
      <div
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white/90 p-2 text-stone-500 shadow-sm transition-colors hover:text-stone-900"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[280px] bg-stone-100 md:min-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[460px] w-full object-cover object-center md:absolute md:inset-0 md:max-h-none"
              referrerPolicy="no-referrer"
            />

            {product.isNewArrival && (
              <span className="absolute left-4 top-4 rounded bg-stone-900 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                New Season
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between space-y-5 p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                {product.category} · {product.pieces}
              </p>

              <h2
                id="quickview-title"
                className="mt-1 font-serif text-2xl font-bold text-stone-900"
              >
                {product.name}
              </h2>

              <p className="mt-2 text-xs text-stone-400">
                Product ID: {product.id}
              </p>

              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-bold tabular-nums text-stone-950">
                  PKR {product.pricePKR.toLocaleString()}
                </span>

                {product.originalPricePKR != null && (
                  <span className="text-sm tabular-nums text-stone-400 line-through">
                    PKR {product.originalPricePKR.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-stone-600">
                {product.description}
              </p>

              <div className="mt-4 border-t border-stone-100 pt-3">
                <p className="mb-1 text-xs font-semibold text-stone-800">
                  Fabric Specifications
                </p>

                <p className="text-xs text-stone-600">
                  {product.fabric}
                </p>

                {product.details?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {product.details.slice(0, 5).map((detail, index) => (
                      <li
                        key={`${product.id}-detail-${index}`}
                        className="flex items-start gap-1.5 text-xs text-stone-500"
                      >
                        <span className="text-amber-700">·</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-semibold text-stone-800">
                  Select Size / Style
                </label>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedSize === size
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <label className="text-xs font-semibold text-stone-800">
                  Quantity:
                </label>

                <div className="flex items-center overflow-hidden rounded-lg border border-stone-200 bg-white">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    className="cursor-pointer px-2.5 py-1 text-sm font-bold text-stone-600 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    -
                  </button>

                  <span className="px-3 py-1 text-xs font-medium tabular-nums text-stone-900">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                    className="cursor-pointer px-2.5 py-1 text-sm font-bold text-stone-600 hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm font-semibold text-stone-900">
                Total: PKR {(product.pricePKR * quantity).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2 border-t border-stone-100 pt-3">
              <button
                type="button"
                onClick={handleOrderWhatsApp}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-700"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Order via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleAdd}
                className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-200"
              >
                {addedNotice ? (
                  <span className="font-semibold text-emerald-700">
                    ✓ Added to Shopping Bag
                  </span>
                ) : (
                  'Add to Bag'
                )}
              </button>

              <p className="text-center text-[11px] text-stone-400">
                Contact us through WhatsApp for order assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
