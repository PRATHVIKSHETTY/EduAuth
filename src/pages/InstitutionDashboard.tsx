import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Eye, Ban, CheckCircle, Award } from "lucide-react";
import { mockCertificates, api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function InstitutionDashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [certificates, setCertificates] = useState(mockCertificates);
  const [previewCert, setPreviewCert] = useState<any>(null);

  const handleIssueCertificate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      studentName: formData.get("studentName"),
      course: formData.get("course"),
      grade: formData.get("grade"),
      completionDate: formData.get("completionDate"),
    };

    try {
      const result = await api.issueCertificate(data);
      
      if (result.success) {
        setPreviewCert({
          ...data,
          id: result.certificateId,
          blockchainHash: result.blockchainHash,
          status: "active",
          institution: "Tech University",
          issuedDate: new Date().toISOString().split('T')[0],
        });

        toast({
          title: "Certificate Issued Successfully",
          description: `Certificate ID: ${result.certificateId}`,
        });

        // Reset form
        e.currentTarget.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue certificate",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = (certId: string) => {
    setCertificates(certs =>
      certs.map(cert =>
        cert.id === certId ? { ...cert, status: "revoked" } : cert
      )
    );
    toast({
      title: "Certificate Revoked",
      description: `Certificate ${certId} has been revoked`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-bg">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopNav />
        
        <main className="flex-1 p-8 space-y-8">
          {/* Issue Certificate Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Issue New Certificate
                </CardTitle>
                <CardDescription>Fill in student details to generate and sign a certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleIssueCertificate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Student Name *</Label>
                      <Input id="studentName" name="studentName" placeholder="John Doe" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="course">Course *</Label>
                      <Input id="course" name="course" placeholder="Bachelor of Computer Science" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade *</Label>
                      <Input id="grade" name="grade" placeholder="First Class Honours" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="completionDate">Completion Date *</Label>
                      <Input id="completionDate" name="completionDate" type="date" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signature">Digital Signature / Logo</Label>
                    <div className="flex items-center gap-4">
                      <Input id="signature" type="file" accept="image/*" />
                      <Upload className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                    {isLoading ? "Generating..." : "Generate & Sign Certificate"}
                  </Button>
                </form>

                {/* Certificate Preview */}
                {previewCert && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-6 border-2 border-primary rounded-xl bg-gradient-feature"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Certificate Preview</h3>
                        <p className="text-sm text-muted-foreground">Certificate ID: {previewCert.id}</p>
                      </div>
                      <Badge className="bg-secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Issued
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Student:</span> {previewCert.studentName}</p>
                      <p><span className="font-semibold">Course:</span> {previewCert.course}</p>
                      <p><span className="font-semibold">Grade:</span> {previewCert.grade}</p>
                      <p><span className="font-semibold">Completion Date:</span> {previewCert.completionDate}</p>
                      <p className="text-xs text-muted-foreground font-mono break-all">
                        <span className="font-semibold">Blockchain Hash:</span> {previewCert.blockchainHash}
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Issued Certificates Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Issued Certificates</CardTitle>
                <CardDescription>Manage all certificates issued by your institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Certificate ID</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Issued Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {certificates.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-mono text-sm">{cert.id}</TableCell>
                          <TableCell className="font-medium">{cert.studentName}</TableCell>
                          <TableCell>{cert.course}</TableCell>
                          <TableCell>{cert.issuedDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={cert.status === "active" ? "default" : "destructive"}
                              className={cert.status === "active" ? "bg-secondary" : ""}
                            >
                              {cert.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {cert.status === "active" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRevoke(cert.id)}
                              >
                                <Ban className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
