import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificateId: string;
  studentName: string;
  course: string;
}

export const QRCodeModal = ({ open, onOpenChange, certificateId, studentName, course }: QRCodeModalProps) => {
  const verificationUrl = `${window.location.origin}/verify/${certificateId}`;

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `${certificateId}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Certificate: ${course}`,
          text: `Verify certificate for ${studentName}`,
          url: verificationUrl,
        });
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      navigator.clipboard.writeText(verificationUrl);
      // TODO: Add toast notification
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Certificate QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to verify the certificate
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="p-4 bg-white rounded-lg shadow-card">
            <QRCodeSVG
              id="qr-code-svg"
              value={verificationUrl}
              size={200}
              level="H"
              includeMargin
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="font-semibold text-foreground">{studentName}</p>
            <p className="text-sm text-muted-foreground">{course}</p>
            <p className="text-xs text-muted-foreground font-mono">{certificateId}</p>
          </div>

          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="default" className="flex-1" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
