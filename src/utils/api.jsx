import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies in cross-domain requests
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Get token from storage (localStorage or sessionStorage)
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // If token exists, add authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (expired token, etc.)
    if (error.response && error.response.status === 401) {
      // Clear auth data
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      // Optionally, redirect to login page
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  register: (userData) => {
    return api.post("/auth/register", userData);
  },

  login: (email, password) => {
    return api.post("/auth/login", { email, password });
  },

  logout: () => {
    return api.post("/auth/logout");
  },

  getCurrentUser: () => {
    return api.get("/auth/current-user");
  },

  forgotPassword: (email) => {
    return api.post("/auth/forgot-password", { email });
  },

  resetPassword: (resetToken, password) => {
    return api.put(`/auth/reset-password/${resetToken}`, { password });
  },
};

// User services
export const userService = {
  getProfile: () => {
    return api.get("/users/profile");
  },

  updateProfile: (userData) => {
    return api.put("/users/profile", userData);
  },

  getUsers: () => {
    return api.get("/admin/users");
  },

  changePassword: (currentPassword, newPassword) => {
    return api.put("/users/password", {
      currentPassword,
      newPassword,
    });
  },

  getWishlist: () => {
    return api.get("/users/wishlist");
  },

  addToWishlist: (productId) => {
    return api.post("/users/wishlist", { productId });
  },

  removeFromWishlist: (productId) => {
    return api.delete(`/users/wishlist/${productId}`);
  },
};

// Product services
export const productService = {
  getProducts: (params) => {
    return api.get("/products", { params });
  },

  getFeaturedProducts: () => {
    return api.get("/products/featured");
  },

  getCategories: () => {
    return api.get("/products/categories");
  },

  getProductsByCategory: (categoryId) => {
    return api.get(`/products/category/${categoryId}`);
  },

  getProductById: (productId) => {
    return api.get(`/products/${productId}`);
  },

  // Admin product management
  createProduct: (productData) => {
    return api.post("/admin/products", productData);
  },

  updateProduct: (productId, productData) => {
    return api.put(`/admin/products/${productId}`, productData);
  },

  deleteProduct: (productId) => {
    return api.delete(`/admin/products/${productId}`);
  },

  uploadProductImage: (formData) => {
    return api.post("/admin/products/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Category management
  createCategory: (categoryData) => {
    return api.post("/admin/products/categories", categoryData);
  },

  updateCategory: (categoryId, categoryData) => {
    return api.put(`/admin/products/categories/${categoryId}`, categoryData);
  },

  deleteCategory: (categoryId) => {
    return api.delete(`/admin/products/categories/${categoryId}`);
  },
};

// Order services
export const orderService = {
  createOrder: (orderData) => {
    return api.post("/orders", orderData);
  },

  getUserOrders: () => {
    return api.get("/orders/my-orders");
  },

  getOrderById: (orderId) => {
    return api.get(`/orders/${orderId}`);
  },

  // Admin order management
  getAllOrders: (params) => {
    return api.get("/admin/orders", { params });
  },

  updateOrderStatus: (orderId, status) => {
    return api.put(`/admin/orders/${orderId}/status`, { status });
  },

  addOrderNotes: (orderId, notes) => {
    return api.put(`/admin/orders/${orderId}/notes`, { notes });
  },

  updatePaymentStatus: (orderId, paymentStatus, paymentDetails) => {
    return api.put(`/admin/orders/${orderId}/payment`, {
      paymentStatus,
      paymentDetails,
    });
  },

  deleteOrder: (orderId) => {
    return api.delete(`/admin/orders/${orderId}`);
  },
};

// Payment services
export const paymentService = {
  initiateMpesaPayment: (paymentData) => {
    return api.post("/payments/mpesa/initiate", paymentData);
  },

  verifyPayment: (orderId) => {
    return api.get(`/payments/verify/${orderId}`);
  },
};

// FAQ services
export const faqService = {
  getFaqs: () => {
    return api.get("/faqs");
  },

  getFaqCategories: () => {
    return api.get("/faqs/categories");
  },

  // Admin FAQ management
  getAllFaqs: () => {
    return api.get("/admin/faqs");
  },

  createFaq: (faqData) => {
    return api.post("/admin/faqs", faqData);
  },

  updateFaq: (faqId, faqData) => {
    return api.put(`/admin/faqs/${faqId}`, faqData);
  },

  deleteFaq: (faqId) => {
    return api.delete(`/admin/faqs/${faqId}`);
  },

  reorderFaqs: (ordersData) => {
    return api.put("/admin/faqs/reorder", { orders: ordersData });
  },
};

// Testimonial services
export const testimonialService = {
  getTestimonials: () => {
    return api.get("/testimonials");
  },

  submitTestimonial: (testimonialData) => {
    return api.post("/testimonials", testimonialData);
  },

  // Admin testimonial management
  getAllTestimonials: () => {
    return api.get("/admin/testimonials");
  },

  approveTestimonial: (testimonialId, approved) => {
    return api.put(`/admin/testimonials/${testimonialId}/approve`, {
      approved,
    });
  },

  updateTestimonial: (testimonialId, testimonialData) => {
    return api.put(`/admin/testimonials/${testimonialId}`, testimonialData);
  },

  deleteTestimonial: (testimonialId) => {
    return api.delete(`/admin/testimonials/${testimonialId}`);
  },

  uploadTestimonialImage: (formData) => {
    return api.post("/admin/testimonials/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// Settings services
export const settingsService = {
  getSettings: () => {
    return api.get("/settings");
  },

  // Admin settings management
  getAllSettings: () => {
    return api.get("/admin/settings");
  },

  updateSettings: (settingsData) => {
    return api.put("/admin/settings", settingsData);
  },
};

export default api;
