class APIClient {
  private baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }
  
  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
  
  // AI Workspace endpoints
  async getDeliberationRooms() {
    return this.get('/ai-workspace/rooms');
  }

  async createRoom(data: { name: string; description: string; agents: string[] }) {
    return this.post('/ai-workspace/rooms', data);
  }

  async joinRoom(roomId: string) {
    return this.post(`/ai-workspace/rooms/${roomId}/join`, {});
  }

  async getTaskHistory() {
    return this.get('/ai-workspace/tasks');
  }
  
  // IP Fortress endpoints
  async getPatents(filters: any = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.get(`/ip-fortress/patents?${queryParams}`);
  }

  async searchPatents(query: string) {
    return this.post('/ip-fortress/patents/search', { query });
  }

  async getPatentDetails(id: string) {
    return this.get(`/ip-fortress/patents/${id}`);
  }

  async getMaintenanceAlerts() {
    return this.get('/ip-fortress/maintenance/alerts');
  }
  
  // Business Foundry endpoints
  async runMarketSizing(data: any) {
    return this.post('/business-foundry/market-sizing', data);
  }

  async generateFinancialProjections(data: any) {
    return this.post('/business-foundry/financial-projections', data);
  }

  async getCompetitiveAnalysis(filters: any = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.get(`/business-foundry/competitive-analysis?${queryParams}`);
  }

  async getCustomerSegmentation() {
    return this.get('/business-foundry/customer-segmentation');
  }

  // Admin endpoints
  async getSystemStats() {
    return this.get('/admin/stats');
  }

  async getUsers(filters: any = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.get(`/admin/users?${queryParams}`);
  }

  async createUser(data: any) {
    return this.post('/admin/users', data);
  }
}

export const apiClient = new APIClient();