// Product Service - API abstraction layer
// When backend is ready, only the implementation inside these methods needs to change

class ProductService {
  constructor() {
    this.storageKey = 'products_data';
  }

  // Get all products
  async getAllProducts() {
    // Future: Replace with API call
    // return fetch('/api/products').then(res => res.json());
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = this.getStoredProducts();
        resolve(products);
      }, 300);
    });
  }

  // Get product by ID
  async getProductById(id) {
    // Future: return fetch(`/api/products/${id}`).then(res => res.json());
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = this.getStoredProducts();
        const product = products.find(p => p.id === id) || null;
        resolve(product);
      }, 200);
    });
  }

  // Add new product
  async addProduct(product) {
    // Future: return fetch('/api/products', { method: 'POST', body: JSON.stringify(product) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = this.getStoredProducts();
        const newProduct = {
          ...product,
          id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          views: 0,
          createdAt: new Date().toISOString()
        };
        
        products.push(newProduct);
        this.saveProducts(products);
        resolve(newProduct);
      }, 300);
    });
  }

  // Update product
  async updateProduct(id, updates) {
    // Future: return fetch(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(updates) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = this.getStoredProducts();
        const index = products.findIndex(p => p.id === id);
        
        if (index !== -1) {
          products[index] = { ...products[index], ...updates };
          this.saveProducts(products);
        }
        
        resolve();
      }, 300);
    });
  }

  // Delete product
  async deleteProduct(id) {
    // Future: return fetch(`/api/products/${id}`, { method: 'DELETE' })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = this.getStoredProducts();
        const filtered = products.filter(p => p.id !== id);
        this.saveProducts(filtered);
        resolve();
      }, 300);
    });
  }

  // Increment product view count
  async incrementView(id) {
    // Future: return fetch(`/api/products/${id}/view`, { method: 'POST' })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = this.getStoredProducts();
        const product = products.find(p => p.id === id);
        
        if (product) {
          product.views = (product.views || 0) + 1;
          this.saveProducts(products);
        }
        
        resolve();
      }, 100);
    });
  }

  // Helper methods for local storage (remove when backend is ready)
  getStoredProducts() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Return default mock products
    const mockProducts = this.getMockProducts();
    this.saveProducts(mockProducts);
    return mockProducts;
  }

  saveProducts(products) {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  getMockProducts() {
    return [
      {
        id: 'prod_001',
        title: 'Classic White Tee',
        category: 'T-Shirts',
        price: 29.99,
        description: 'Premium cotton t-shirt with a classic fit. Perfect for everyday wear.',
        availability: 'in-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        featured: true,
        views: 245,
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 'prod_002',
        title: 'Denim Jacket',
        category: 'Jackets',
        price: 89.99,
        description: 'Timeless denim jacket with a modern twist. Versatile and durable.',
        availability: 'in-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        featured: true,
        views: 189,
        createdAt: '2024-01-12T14:30:00Z'
      },
      {
        id: 'prod_003',
        title: 'Blaaack Hoodie',
        category: 'Hoodies',
        price: 59.99,
        description: 'Comfortable cotton-blend hoodie. Perfect for layering.',
        availability: 'in-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        views: 312,
        createdAt: '2024-01-08T09:15:00Z'
      },
      {
        id: 'prod_004',
        title: 'Slim Fit Jeans',
        category: 'Jeans',
        price: 79.99,
        description: 'Modern slim fit jeans with stretch comfort. Available in multiple washes.',
        availability: 'low-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        views: 156,
        createdAt: '2024-01-14T11:20:00Z'
      },
      {
        id: 'prod_005',
        title: 'Summer Dress',
        category: 'Dresses',
        price: 69.99,
        description: 'Lightweight and breezy summer dress. Perfect for warm weather.',
        availability: 'in-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        featured: true,
        views: 278,
        createdAt: '2024-01-11T16:45:00Z'
      },
      {
        id: 'prod_006',
        title: 'Leather Boots',
        category: 'Shoes',
        price: 149.99,
        description: 'Premium leather boots with classic styling. Built to last.',
        availability: 'in-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        views: 198,
        createdAt: '2024-01-09T13:30:00Z'
      },
      {
        id: 'prod_007',
        title: 'Graphic Print Tee',
        category: 'T-Shirts',
        price: 34.99,
        description: 'Unique graphic print on premium cotton. Express yourself.',
        availability: 'in-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        views: 421,
        createdAt: '2024-01-13T10:00:00Z'
      },
      {
        id: 'prod_008',
        title: 'Wool Coat',
        category: 'Jackets',
        price: 199.99,
        description: 'Elegant wool coat for cold weather. Tailored fit.',
        availability: 'out-of-stock',
        images: [
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp',
          'https://www.arjobd.com/uploads/products/A0397/1768222611_251-w600h550.webp'
        ],
        views: 134,
        createdAt: '2024-01-07T15:20:00Z'
      }
    ];
  }
}

export const productService = new ProductService();
