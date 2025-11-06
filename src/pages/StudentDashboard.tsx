import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, Eye, QrCode, Linkedin, Wallet } from "lucide-react";
import { mockCertificates } from "@/lib/api";
import { motion } from "framer-motion";
import { QRCodeModal } from "@/components/QRCodeModal";

export default function StudentDashboard() {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  
  // Filter only first 2 certificates for student view
  const studentCerts = mockCertificates.filter(c => c.status === "active").slice(0, 2);

  const handleViewQR = (cert: any) => {
    setSelectedCert(cert);
    setQrModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-bg">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNav />
        
        <main className="flex-1 p-8 space-y-8">
          {/* My Certificates Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">My Certificates</h2>
              <p className="text-muted-foreground">View, download, and share your verified credentials</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-card hover:shadow-elevated transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <Badge className="bg-secondary">
                          Verified
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{cert.course}</CardTitle>
                      <CardDescription>{cert.institution}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Grade:</span> {cert.grade}</p>
                        <p><span className="font-semibold">Completed:</span> {cert.completionDate}</p>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          {cert.id}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleViewQR(cert)}
                        >
                          <QrCode className="w-4 h-4 mr-1" />
                          QR Code
                        </Button>
                        <Button variant="default" size="sm" className="flex-1">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your educational identity and connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Alice Johnson" readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input defaultValue="alice.johnson@example.com" readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Verified Edu ID</Label>
                    <Input defaultValue="EDU-2024-001-VERIFIED" readOnly className="font-mono text-sm" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input defaultValue="Tech University" readOnly />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-4">Connect External Accounts</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect LinkedIn
                    </Button>
                    <Button variant="outline">
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Update Profile</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      {/* QR Code Modal */}
      {selectedCert && (
        <QRCodeModal
          open={qrModalOpen}
          onOpenChange={setQrModalOpen}
          certificateId={selectedCert.id}
          studentName={selectedCert.studentName}
          course={selectedCert.course}
        />
      )}
    </div>
  );
}
