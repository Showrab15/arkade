// "use client"
// import { Eye } from 'lucide-react';
// import Link from 'next/link';



// export default function ProductCard({ product }) {

//   const getAvailabilityBadge = () => {
//     if (product.availability === 'out-of-stock') {
//       return (
//         <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//           Out of Stock
//         </span>
//       );
//     }
//     if (product.availability === 'low-stock') {
//       return (
//         <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
//           Low Stock
//         </span>
//       );
//     }
//     return null;
//   };

//   return (
//     <Link
//       href={`/products/${product.id}`}
//       className=" group block bg-white rounded-lg overflow-hidden"
//     >
//       {/* Product Image */}
//       <div className="relative w-full aspect-square bg-gray-100 overflow-hidden group">
//         <img
//           src={product.images[0]}
//           alt={product.title}
//           className="
//       w-full h-full object-cover
//       transition-transform duration-500 ease-out
//       group-hover:scale-110
//     "
//         />

//         {getAvailabilityBadge()}

//         {/* Quick View Overlay */}
//         <div
//           className="
//       absolute bottom-0 left-0 w-full
//       bg-black/50 text-white
//       text-sm font-medium text-center
//       py-3
//       transform translate-y-full
//       opacity-0
//       transition-all duration-300 ease-out
//       group-hover:translate-y-0
//       group-hover:opacity-100 flex items-center justify-center gap-4
//     "
//         >
//           <Eye />  Quick View
//         </div>
//       </div>


//       {/* Product Info */}
//       <div className="p-3">
//         <h3 className="text-sm md:text-base font-medium mb-1 line-clamp-1 transition-colors group-hover:text-gray-900">
//           {product.title}
//         </h3>
//         <div className="flex items-center justify-between">
//           <p className="text-sm md:text-base font-normal">
//             ${product.price.toFixed(2)}
//           </p>
//           <span className="text-xs font-medium  text-gray-500">
//             {product.category}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }
