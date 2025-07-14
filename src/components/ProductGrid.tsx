import React from 'react';

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  images: string[];
  soldOut?: boolean;
  features: string[];
  sizes: {
    size: string;
    length: string;
    pitToPit: string;
    womens: string;
    inStock: boolean;
  }[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'EUPHORIA',
    type: 'JERSEY',
    price: 1000.99,
    image: '/images/ox16_shirt.jpg',
    images: [
      '/images/ox16.jpg',
      '/images/ox16_front.jpg',
      '/images/ox16_shirt.jpg',
    ],
    soldOut: false,
    features: [
      '14oz Indigo Washed Denim',
      'Contrast gold stitching',
      'Dotted Embroidered Logo',
      'Branded Metal Buttons',
      'Rivets',
      'Front Pleats'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: true },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: true },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: true },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: true },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: true }
    ]
  },
  {
    id: '2',
    name: 'Vintage Blue',
    type: 'JACKET',
    price: 3899.00,
    image: '/images/Artboard1copy29.png',
    images: [
      '/images/Artboard1copy29.png',
      '/images/Artboard1copy19_b6ccf968-7783-40c7-8895-f7e5dbcd4f1f.png',
      '/images/Artboard1copy24_c9a3d4d4-2738-4db3-af4a-6c119196cfa6.png',
      '/images/Artboard1copy16_c8156efa-f030-4097-86f3-8ad2cf73a5dd.png'
    ],
    features: [
      'Premium Denim Jacket',
      'Vintage Wash Treatment',
      'Custom Metal Buttons',
      'Side Pockets',
      'Adjustable Waist Tabs',
      'Embroidered Back Design'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: true },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: true },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: true },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: false },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: true }
    ]
  },
  {
    id: '3',
    name: 'Classic White',
    type: 'TEE',
    price: 2199.00,
    image: '/images/Artboard1copy16_c8156efa-f030-4097-86f3-8ad2cf73a5dd.png',
    images: [
      '/images/Artboard1copy16_c8156efa-f030-4097-86f3-8ad2cf73a5dd.png',
      '/images/Artboard1copy29.png',
      '/images/Artboard1copy24_c9a3d4d4-2738-4db3-af4a-6c119196cfa6.png',
      '/images/Artboard1copy19_b6ccf968-7783-40c7-8895-f7e5dbcd4f1f.png'
    ],
    soldOut: true,
    features: [
      'Premium Cotton Jersey',
      'Ribbed Crew Neck',
      'Embroidered Logo',
      'Side Split Hem',
      'Relaxed Fit',
      'Pre-Shrunk Fabric'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: false },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: false },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: false },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: false },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: false }
    ]
  },
  {
    id: '4',
    name: 'Black Label',
    type: 'COLLECTION',
    price: 5432.00,
    image: '/images/Artboard1copy24_c9a3d4d4-2738-4db3-af4a-6c119196cfa6.png',
    images: [
      '/images/Artboard1copy24_c9a3d4d4-2738-4db3-af4a-6c119196cfa6.png',
      '/images/Artboard1copy16_c8156efa-f030-4097-86f3-8ad2cf73a5dd.png',
      '/images/Artboard1copy29.png',
      '/images/Artboard1copy19_b6ccf968-7783-40c7-8895-f7e5dbcd4f1f.png'
    ],
    features: [
      'Limited Edition Design',
      'Premium Black Denim',
      'Gold Hardware Details',
      'Custom Label',
      'Signature Stitching',
      'Exclusive Packaging'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: true },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: true },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: true },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: true },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: true }
    ]
  },
  {
    id: '5',
    name: 'Urban Style',
    type: 'STREETWEAR',
    price: 3285.00,
    image: '/images/Artboard1copy9_bb687d9e-3329-4c4b-bf7d-d4d7bb31c008.png',
    images: [
      '/images/Artboard1copy9_bb687d9e-3329-4c4b-bf7d-d4d7bb31c008.png',
      '/images/Artboard1copy24_c9a3d4d4-2738-4db3-af4a-6c119196cfa6.png',
      '/images/Artboard1copy16_c8156efa-f030-4097-86f3-8ad2cf73a5dd.png',
      '/images/Artboard1copy29.png'
    ],
    soldOut: true,
    features: [
      'Street Style Design',
      'Graphic Print Details',
      'Custom Patches',
      'Hidden Pockets',
      'Reflective Elements',
      'Urban Fit'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: false },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: false },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: false },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: false },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: false }
    ]
  },
  {
    id: '6',
    name: 'Summer Vibes',
    type: 'CASUAL',
    price: 2864.00,
    image: '/images/Artboard1copy5_098b0071-cc8c-43da-97bc-77bf78f7408e.jpg',
    images: [
      '/images/Artboard1copy5_098b0071-cc8c-43da-97bc-77bf78f7408e.jpg',
      '/images/Artboard1copy9_bb687d9e-3329-4c4b-bf7d-d4d7bb31c008.png',
      '/images/Artboard1copy24_c9a3d4d4-2738-4db3-af4a-6c119196cfa6.png',
      '/images/Artboard1copy16_c8156efa-f030-4097-86f3-8ad2cf73a5dd.png'
    ],
    features: [
      'Lightweight Cotton Blend',
      'Summer Pattern Print',
      'Breathable Fabric',
      'UV Protection',
      'Quick Dry Technology',
      'Comfort Fit'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: true },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: true },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: true },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: true },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: true }
    ]
  },
  {
    id: '7',
    name: 'Essential',
    type: 'BASIC',
    price: 1999.00,
    image: '/images/Artboard1copy2.png',
    images: [
      '/images/Artboard1copy2.png',
      '/images/Artboard1copy5_098b0071-cc8c-43da-97bc-77bf78f7408e.jpg',
      '/images/Artboard1copy9_bb687d9e-3329-4c4b-bf7d-d4d7bb31c008.png',
      '/images/Artboard1copy24_c9a3d4d4-2738-4db3-af4a-6c119196cfa6.png'
    ],
    features: [
      'Basic Essential Design',
      'Soft Cotton Material',
      'Minimalist Style',
      'Versatile Wear',
      'Classic Cut',
      'Easy Care Fabric'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: true },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: true },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: true },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: true },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: true }
    ]
  },
  {
    id: '8',
    name: 'Premium',
    type: 'SIGNATURE',
    price: 6499.00,
    image: '/images/Artboard1.png',
    images: [
      '/images/Artboard1.png',
      '/images/Artboard1copy2.png',
      '/images/Artboard1copy5_098b0071-cc8c-43da-97bc-77bf78f7408e.jpg',
      '/images/Artboard1copy9_bb687d9e-3329-4c4b-bf7d-d4d7bb31c008.png'
    ],
    soldOut: true,
    features: [
      'Premium Quality Material',
      'Signature Collection',
      'Hand-Finished Details',
      'Limited Edition',
      'Luxury Hardware',
      'Gift Box Packaging'
    ],
    sizes: [
      { size: 'XS', length: '64 cm', pitToPit: '58 cm', womens: '6-8', inStock: false },
      { size: 'S', length: '66 cm', pitToPit: '60 cm', womens: '8-10', inStock: false },
      { size: 'M', length: '68 cm', pitToPit: '62 cm', womens: '10-12', inStock: false },
      { size: 'L', length: '70 cm', pitToPit: '64 cm', womens: '12-14', inStock: false },
      { size: 'XL', length: '72 cm', pitToPit: '66 cm', womens: '14+', inStock: true }
    ]
  }
];

interface ProductGridProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onNavigate }) => {
  const handleProductClick = (productId: string) => {
    onNavigate('product', { id: productId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-12 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="relative overflow-hidden bg-gray-100 mb-3">
              {product.soldOut && (
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 text-xs tracking-widest uppercase font-medium z-10">
                  Sold Out
                </div>
              )}
              <img
                src={product.image}
                alt={`${product.type} ${product.name}`}
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-medium text-sm sm:text-sm md:text-base">
                [{product.type}] {product.name}
              </h3>
              <p className="text-sm sm:text-sm md:text-base font-light">
                LE {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;