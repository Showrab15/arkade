// Analytics Service - Tracking and metrics
// Future: Replace with actual backend API calls

class AnalyticsService {
  async trackPageView(page) {
    // Future: Send to backend analytics API
    // await fetch('/api/analytics/pageview', { method: 'POST', body: JSON.stringify({ page }) })

    return new Promise((resolve) => {
      setTimeout(() => {
        const views = this.getPageViews();
        views[page] = (views[page] || 0) + 1;
        localStorage.setItem("page_views", JSON.stringify(views));
        resolve();
      }, 50);
    });
  }

  async getAnalytics() {
    // Future: return fetch('/api/analytics').then(res => res.json())

    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate mock analytics data
        const analytics = {
          totalVisitors: Math.floor(Math.random() * 5000) + 10000,
          totalProductViews: Math.floor(Math.random() * 15000) + 25000,
          totalUsers: Math.floor(Math.random() * 500) + 1000,
          visitorsByDate: this.getMockVisitorsByDate(),
          viewsByCategory: this.getMockViewsByCategory(),
          topProducts: this.getMockTopProducts(),
        };

        resolve(analytics);
      }, 300);
    });
  }

  getPageViews() {
    const stored = localStorage.getItem("page_views");
    return stored ? JSON.parse(stored) : {};
  }

  getMockVisitorsByDate() {
    const data = [];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < 7; i++) {
      data.push({
        date: days[i],
        visitors: Math.floor(Math.random() * 500) + 200,
      });
    }

    return data;
  }

  getMockViewsByCategory() {
    const categories = ["T-Shirts", "Jeans", "Jackets", "Dresses", "Hoodies", "Shoes"];

    return categories.map((category) => ({
      category,
      views: Math.floor(Math.random() * 2000) + 500,
    }));
  }

  getMockTopProducts() {
    return [
      { id: "prod_007", title: "Graphic Print Tee", views: 421 },
      { id: "prod_003", title: "Blaaack Hoodie", views: 312 },
      { id: "prod_005", title: "Summer Dress", views: 278 },
      { id: "prod_001", title: "Classic White Tee", views: 245 },
      { id: "prod_006", title: "Leather Boots", views: 198 },
    ];
  }
}

export const analyticsService = new AnalyticsService();
