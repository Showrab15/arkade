// "use client"
// import { useState } from 'react';
// import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
// import AdminLayout from '@/components/AdminLayout';
// import { useProducts } from '@/context/useProducts';

// export default function AdminProducts() {
//   const { products, addProduct, updateProduct, deleteProduct, refreshProducts } = useProducts();
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     price: '',
//     description: '',
//     availability: 'in-stock' | 'out-of-stock' | 'low-stock',
//     images: [],
//     featured: false
//   });
//   const [imageInput, setImageInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleOpenModal = (product) => {
//     if (product) {
//       setEditingProduct(product);
//       setFormData({
//         title: product.title,
//         category: product.category,
//         price: product.price.toString(),
//         description: product.description,
//         availability: product.availability,
//         images: product.images,
//         featured: product.featured || false
//       });
//     } else {
//       setEditingProduct(null);
//       setFormData({
//         title: '',
//         category: '',
//         price: '',
//         description: '',
//         availability: 'in-stock',
//         images: [],
//         featured: false
//       });
//     }
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingProduct(null);
//     setImageInput('');
//   };

//   const handleAddImage = () => {
//     if (imageInput.trim()) {
//       setFormData({
//         ...formData,
//         images: [...formData.images, imageInput.trim()]
//       });
//       setImageInput('');
//     }
//   };

//   const handleRemoveImage = (index) => {
//     setFormData({
//       ...formData,
//       images: formData.images.filter((_, i) => i !== index)
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const productData = {
//         title: formData.title,
//         category: formData.category,
//         price: parseFloat(formData.price),
//         description: formData.description,
//         availability: formData.availability,
//         images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800'],
//         featured: formData.featured
//       };

//       if (editingProduct) {
//         await updateProduct(editingProduct.id, productData);
//       } else {
//         await addProduct(productData);
//       }

//       handleCloseModal();
//       await refreshProducts();
//     } catch (error) {
//       console.error('Error saving product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       await deleteProduct(id);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 md:p-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl md:text-3xl mb-2">Products</h1>
//             <p className="text-gray-600">{products.length} total products</p>
//           </div>
//           <button
//             onClick={() => handleOpenModal()}
//             className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             <span className="hidden sm:inline">Add Product</span>
//           </button>
//         </div>

//         {/* Products Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
//                     Views
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs uppercase tracking-wider text-gray-600">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={product.images[0]}
//                           alt={product.title}
//                           className="w-12 h-12 rounded object-cover"
//                         />
//                         <div>
//                           <p className="text-sm">{product.title}</p>
//                           {product.featured && (
//                             <span className="text-xs text-yellow-600">Featured</span>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs rounded-full ${
//                           product.availability === 'in-stock'
//                             ? 'bg-green-100 text-green-700'
//                             : product.availability === 'low-stock'
//                             ? 'bg-yellow-100 text-yellow-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}
//                       >
//                         {product.availability}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {product.views || 0}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <button
//                           onClick={() => handleOpenModal(product)}
//                           className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-colors"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(product.id)}
//                           className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-xl">
//                 {editingProduct ? 'Edit Product' : 'Add New Product'}
//               </h2>
//               <button
//                 onClick={handleCloseModal}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm mb-2">Product Title</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm mb-2">Category</label>
//                   <input
//                     type="text"
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm mb-2">Price</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={formData.price}
//                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm mb-2">Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                   rows={3}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-2">Availability</label>
//                 <select
//                   value={formData.availability}
//                   onChange={(e) => setFormData({ ...formData, availability: e.target.value  })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                 >
//                   <option value="in-stock">In Stock</option>
//                   <option value="low-stock">Low Stock</option>
//                   <option value="out-of-stock">Out of Stock</option>
//                 </select>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="featured"
//                   checked={formData.featured}
//                   onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
//                   className="w-4 h-4"
//                 />
//                 <label htmlFor="featured" className="text-sm">
//                   Mark as Featured Product
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm mb-2">Product Images</label>
//                 <div className="flex space-x-2 mb-3">
//                   <input
//                     type="url"
//                     value={imageInput}
//                     onChange={(e) => setImageInput(e.target.value)}
//                     placeholder="https://example.com/image.jpg"
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddImage}
//                     className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {formData.images.length > 0 && (
//                   <div className="grid grid-cols-3 gap-2">
//                     {formData.images.map((image, index) => (
//                       <div key={index} className="relative aspect-square rounded overflow-hidden group">
//                         <img
//                           src={image}
//                           alt={`Product ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveImage(index)}
//                           className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
//                 >
//                   {loading ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }
