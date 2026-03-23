import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Download,
  Share,
  Print,
  Verified,
  EmojiEvents,
  School,
  CalendarToday,
  CheckCircle,
  QrCode,
  Language,
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateGenerator = ({ 
  course, 
  user, 
  completionDate,
  onCertificateGenerated,
  isVisible,
  onClose 
}) => {
  const certificateRef = useRef(null);
  const [generating, setGenerating] = useState(false);
  const [certificateData, setCertificateData] = useState({
    studentName: user?.name || '',
    courseName: course?.title || '',
    completionDate: completionDate || new Date().toLocaleDateString(),
    instructorName: course?.instructor || '',
    certificateId: `CERT-${Date.now()}`,
    duration: course?.duration || '40 hours',
    grade: 'A+',
  });
  const [shareOptions, setShareOptions] = useState(false);

  const generateCertificateId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CERT-${timestamp}-${random}`;
  };

  const downloadAsImage = async () => {
    if (!certificateRef.current) return;
    
    setGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `certificate-${certificateData.certificateId}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      if (onCertificateGenerated) {
        onCertificateGenerated({
          ...certificateData,
          type: 'image',
          downloadDate: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error generating certificate image:', error);
    } finally {
      setGenerating(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;
    
    setGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const imgWidth = 297;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`certificate-${certificateData.certificateId}.pdf`);
      
      if (onCertificateGenerated) {
        onCertificateGenerated({
          ...certificateData,
          type: 'pdf',
          downloadDate: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGenerating(false);
    }
  };

  const printCertificate = () => {
    if (!certificateRef.current) return;
    
    const printWindow = window.open('', '_blank');
    const certificateHTML = certificateRef.current.innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate of Completion</title>
          <style>
            body { margin: 0; padding: 20px; font-family: 'Georgia', serif; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${certificateHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const shareCertificate = async (platform) => {
    const shareText = `I've successfully completed the "${certificateData.courseName}" course! 🎉`;
    const shareUrl = window.location.href;
    
    let shareLink = '';
    
    switch (platform) {
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Course Completion Certificate',
              text: shareText,
              url: shareUrl,
            });
            return;
          } catch (error) {
            console.log('Error sharing:', error);
          }
        }
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const verifyCertificate = () => {
    // In a real app, this would navigate to a verification page
    alert(`Certificate verification link: https://yourlms.com/verify/${certificateData.certificateId}`);
  };

  return (
    <Dialog open={isVisible} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents sx={{ color: '#ffd700', fontSize: 30 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Certificate of Completion
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Download as Image">
              <IconButton onClick={downloadAsImage} disabled={generating}>
                <Download />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Download as PDF">
              <IconButton onClick={downloadAsPDF} disabled={generating}>
                <Download />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Print Certificate">
              <IconButton onClick={printCertificate}>
                <Print />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Share Certificate">
              <IconButton onClick={() => setShareOptions(!shareOptions)}>
                <Share />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {shareOptions && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Share your achievement:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button size="small" onClick={() => shareCertificate('linkedin')}>
                LinkedIn
              </Button>
              <Button size="small" onClick={() => shareCertificate('twitter')}>
                Twitter
              </Button>
              <Button size="small" onClick={() => shareCertificate('facebook')}>
                Facebook
              </Button>
              <Button size="small" onClick={() => shareCertificate('native')}>
                Native Share
              </Button>
            </Box>
          </Alert>
        )}

        {/* Certificate Preview */}
        <Box
          ref={certificateRef}
          sx={{
            bgcolor: '#ffffff',
            borderRadius: 2,
            p: 4,
            border: '8px solid #ffd700',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          }}
        >
          {/* Certificate Border Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 215, 0, 0.1) 10px,
                rgba(255, 215, 0, 0.1) 20px
              )`,
              pointerEvents: 'none',
            }}
          />

          {/* Certificate Header */}
          <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: '#1a1a2e',
                mb: 1,
                fontFamily: 'Georgia, serif',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Certificate of Completion
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <School sx={{ fontSize: 40, color: '#3a86ff', mx: 1 }} />
              <Typography
                variant="h4"
                sx={{
                  color: '#3a86ff',
                  fontWeight: 600,
                  fontFamily: 'Georgia, serif',
                }}
              >
                Learning Management System
              </Typography>
              <School sx={{ fontSize: 40, color: '#3a86ff', mx: 1 }} />
            </Box>
          </Box>

          {/* Certificate Body */}
          <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="body1"
              sx={{
                color: '#6b7280',
                mb: 3,
                fontStyle: 'italic',
                fontSize: '1.1rem',
              }}
            >
              This is to certify that
            </Typography>
            
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#1a1a2e',
                mb: 3,
                borderBottom: '3px solid #ffd700',
                display: 'inline-block',
                px: 4,
                py: 1,
                fontFamily: 'Georgia, serif',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
              }}
            >
              {certificateData.studentName}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#6b7280',
                mb: 3,
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              has successfully completed the course
            </Typography>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: '#3a86ff',
                mb: 2,
                fontFamily: 'Georgia, serif',
              }}
            >
              "{certificateData.courseName}"
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 3 }}>
              <Chip
                icon={<CalendarToday />}
                label={`Completed: ${certificateData.completionDate}`}
                sx={{ bgcolor: '#10b981', color: 'white' }}
              />
              <Chip
                icon={<EmojiEvents />}
                label={`Grade: ${certificateData.grade}`}
                sx={{ bgcolor: '#ffd700', color: '#1a1a2e' }}
              />
              <Chip
                label={`Duration: ${certificateData.duration}`}
                sx={{ bgcolor: '#8338ec', color: 'white' }}
              />
            </Box>
          </Box>

          {/* Certificate Footer */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                    Instructor Signature
                  </Typography>
                  <Box sx={{ height: 40, borderBottom: '2px solid #3a86ff', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                    {certificateData.instructorName}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                    Certificate ID
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: '#3a86ff',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                    }}
                  >
                    {certificateData.certificateId}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                Verify this certificate at: www.yourlms.com/verify/{certificateData.certificateId}
              </Typography>
            </Box>
          </Box>

          {/* Verification QR Code (placeholder) */}
          <Box sx={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.3 }}>
            <QrCode sx={{ fontSize: 60, color: '#1a1a2e' }} />
          </Box>
        </Box>

        {/* Certificate Actions */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="body2">
              🎉 Congratulations on completing your course! You can now download, print, or share your certificate.
            </Typography>
          </Alert>
          
          <Button
            variant="contained"
            onClick={verifyCertificate}
            startIcon={<Verified />}
            sx={{
              background: 'linear-gradient(45deg, #10b981, #3a86ff)',
              fontWeight: 600,
            }}
          >
            Verify Certificate
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>
          Close
        </Button>
        
        <Button
          onClick={downloadAsPDF}
          variant="contained"
          disabled={generating}
          sx={{
            background: 'linear-gradient(45deg, #ff006e, #8338ec)',
          }}
        >
          {generating ? 'Generating...' : 'Download PDF'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CertificateGenerator;
