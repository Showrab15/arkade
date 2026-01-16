// authService.js
// Firebase Authentication Service Mock for Next.js
// Fully client-safe (no localStorage on server)

class AuthService {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
  }

  // Initialize stored user (call only on client)
  init() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
  }

  async login(email, password) {
    if (typeof window === "undefined") return null; // server safety

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) {
          reject(new Error("Password must be at least 6 characters"));
          return;
        }

        const user = {
          uid: Math.random().toString(36).substr(2, 9),
          email,
          displayName: email.split("@")[0],
          role: email === "admin@example.com" ? "admin" : "user",
        };

        this.currentUser = user;
        localStorage.setItem("auth_user", JSON.stringify(user));
        this.notifyListeners(user);
        resolve(user);
      }, 500);
    });
  }

  async signup(email, password, displayName) {
    if (typeof window === "undefined") return null;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) {
          reject(new Error("Password must be at least 6 characters"));
          return;
        }

        const user = {
          uid: Math.random().toString(36).substr(2, 9),
          email,
          displayName: displayName || email.split("@")[0],
          role: "user",
        };

        this.currentUser = user;
        localStorage.setItem("auth_user", JSON.stringify(user));
        this.notifyListeners(user);
        resolve(user);
      }, 500);
    });
  }

  async logout() {
    if (typeof window === "undefined") return;

    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        localStorage.removeItem("auth_user");
        this.notifyListeners(null);
        resolve();
      }, 300);
    });
  }

  async getCurrentUser() {
    return Promise.resolve(this.currentUser);
  }

  onAuthStateChanged(callback) {
    this.listeners.push(callback);

    // Call immediately with current user
    if (this.currentUser) {
      callback(this.currentUser);
    }

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  notifyListeners(user) {
    this.listeners.forEach((listener) => listener(user));
  }

  // Admin management
  async updateUserRole(uid, role) {
    if (typeof window === "undefined") return;

    return new Promise((resolve) => {
      setTimeout(() => {
        const users = this.getMockUsers();
        const userIndex = users.findIndex((u) => u.uid === uid);
        if (userIndex !== -1) {
          users[userIndex].role = role;
          localStorage.setItem("mock_users", JSON.stringify(users));
        }
        resolve();
      }, 300);
    });
  }

  async getAllUsers() {
    if (typeof window === "undefined") return [];

    return new Promise((resolve) => {
      setTimeout(() => {
        const users = this.getMockUsers();
        resolve(users);
      }, 300);
    });
  }

  getMockUsers() {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("mock_users");
    if (stored) return JSON.parse(stored);

    const defaultUsers = [
      {
        uid: "admin001",
        email: "admin@example.com",
        displayName: "Admin User",
        role: "admin",
      },
      {
        uid: "user001",
        email: "user1@example.com",
        displayName: "John Doe",
        role: "user",
      },
      {
        uid: "user002",
        email: "user2@example.com",
        displayName: "Jane Smith",
        role: "user",
      },
    ];

    localStorage.setItem("mock_users", JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

// Export a singleton
export const authService = new AuthService();

// On client-side, initialize stored user
if (typeof window !== "undefined") {
  authService.init();
}
