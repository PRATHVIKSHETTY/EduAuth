// Dummy API endpoints for mock data
// Replace these with real API URLs when backend is ready

export const API_ENDPOINTS = {
  login: '/api/login',
  register: '/api/register',
  certificates: '/api/certificates',
  verify: (id: string) => `/api/verify/${id}`,
};

// Mock data for development
export const mockCertificates = [
  {
    id: "CERT-2024-001",
    studentName: "Alice Johnson",
    course: "Bachelor of Computer Science",
    grade: "First Class Honours",
    completionDate: "2024-05-15",
    institution: "Tech University",
    status: "active",
    blockchainHash: "0x7a8f9e2d1c4b6a5f8e3d2c1b9a8f7e6d5c4b3a2f",
    issuedDate: "2024-05-20",
  },
  {
    id: "CERT-2024-002",
    studentName: "Bob Smith",
    course: "Master of Data Science",
    grade: "Distinction",
    completionDate: "2024-06-10",
    institution: "Tech University",
    status: "active",
    blockchainHash: "0x9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c",
    issuedDate: "2024-06-15",
  },
  {
    id: "CERT-2024-003",
    studentName: "Carol Davis",
    course: "Diploma in Web Development",
    grade: "Pass with Merit",
    completionDate: "2024-04-20",
    institution: "Tech University",
    status: "revoked",
    blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    issuedDate: "2024-04-25",
  },
];

// Simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const api = {
  async verifyCertificate(certificateId: string) {
    await delay(1500); // Simulate network delay
    const cert = mockCertificates.find(c => c.id === certificateId);
    if (!cert) {
      return { success: false, message: "Certificate not found" };
    }
    if (cert.status === "revoked") {
      return { success: false, message: "Certificate has been revoked", data: cert };
    }
    return { success: true, message: "Certificate is valid", data: cert };
  },
  
  async getCertificates() {
    await delay(800);
    return mockCertificates;
  },
  
  async issueCertificate(data: any) {
    await delay(1000);
    return {
      success: true,
      certificateId: `CERT-2024-${String(mockCertificates.length + 1).padStart(3, '0')}`,
      blockchainHash: `0x${Math.random().toString(16).slice(2, 42)}`,
    };
  },
};
