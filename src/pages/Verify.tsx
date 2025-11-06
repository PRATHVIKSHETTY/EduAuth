import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, CheckCircle, XCircle, Shield, Building2, User, Hash, QrCode } from "lucide-react";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Verify() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [certificateId, setCertificateId] = useState(id || "");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (id) {
      handleVerify();
    }
  }, [id]);

  const handleVerify = async () => {
    if (!certificateId.trim()) return;
    
    setIsLoading(true);
    setResult(null);

    try {
      const response = await api.verifyCertificate(certificateId);
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred during verification",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="text-2xl font-bold text-primary">
            EduAuth
          </button>
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            Login
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Search Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Verify Certificate</h1>
            <p className="text-lg text-muted-foreground">
              Enter a certificate ID to verify its authenticity on the blockchain
            </p>
          </div>

          <Card className="shadow-elevated mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Certificate Verification
              </CardTitle>
              <CardDescription>
                Enter the certificate ID or upload a certificate file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cert-id">Certificate ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="cert-id"
                    placeholder="e.g., CERT-2024-001"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="font-mono"
                  />
                  <Button onClick={handleVerify} disabled={isLoading || !certificateId.trim()}>
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or upload file</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Input id="cert-file" type="file" accept=".pdf,.jpg,.png" />
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-muted-foreground">Verifying certificate on blockchain...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Card */}
          <AnimatePresence>
            {result && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`shadow-elevated border-2 ${
                  result.success ? "border-secondary" : "border-destructive"
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {result.success ? (
                          <>
                            <CheckCircle className="w-6 h-6 text-secondary" />
                            Certificate Verified
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6 text-destructive" />
                            Verification Failed
                          </>
                        )}
                      </CardTitle>
                      <Badge
                        variant={result.success ? "default" : "destructive"}
                        className={result.success ? "bg-secondary" : ""}
                      >
                        {result.success ? "Valid" : "Invalid"}
                      </Badge>
                    </div>
                    <CardDescription>{result.message}</CardDescription>
                  </CardHeader>

                  {result.data && (
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Certificate Details */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Student Name</p>
                              <p className="font-semibold">{result.data.studentName}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Issuing Institution</p>
                              <p className="font-semibold">{result.data.institution}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Course</p>
                              <p className="font-semibold">{result.data.course}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Hash className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Grade</p>
                              <p className="font-semibold">{result.data.grade}</p>
                            </div>
                          </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center justify-center">
                          <div className="p-4 bg-white rounded-lg shadow-card">
                            <QRCodeSVG
                              value={`${window.location.origin}/verify/${result.data.id}`}
                              size={150}
                              level="H"
                              includeMargin
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-3 text-center">
                            Scan to verify
                          </p>
                        </div>
                      </div>

                      {/* Blockchain Hash */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Blockchain Proof</p>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-xs font-mono break-all text-foreground">
                            {result.data.blockchainHash}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Completion Date</p>
                          <p className="font-semibold">{result.data.completionDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Issue Date</p>
                          <p className="font-semibold">{result.data.issuedDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  )}

                  {!result.success && !result.data && (
                    <CardContent>
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">
                          This certificate could not be found in our records or has been revoked.
                        </p>
                        <Button variant="outline" onClick={() => {
                          setResult(null);
                          setCertificateId("");
                        }}>
                          Try Another Certificate
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Cards */}
          {!result && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-3 gap-4 mt-8"
            >
              <Card className="text-center shadow-card">
                <CardContent className="pt-6">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Secure</h3>
                  <p className="text-sm text-muted-foreground">Blockchain-verified credentials</p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-card">
                <CardContent className="pt-6">
                  <CheckCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Instant</h3>
                  <p className="text-sm text-muted-foreground">Real-time verification</p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-card">
                <CardContent className="pt-6">
                  <QrCode className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Shareable</h3>
                  <p className="text-sm text-muted-foreground">QR codes for easy sharing</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
