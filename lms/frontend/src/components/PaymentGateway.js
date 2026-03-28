import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, TextField, Button, Grid, Divider, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Step, StepLabel, IconButton, Tooltip, InputAdornment, MenuItem
} from '@mui/material';
import {
  CreditCard, AccountBalance, Phone, CheckCircle, Info, Lock, Security, Person, Email, Public
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/AuthContext';

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3, backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'white', transition: 'all 0.3s ease',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
    '&.Mui-focused': { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#a855f7', borderWidth: 2 },
    '&.Mui-disabled': { color: 'rgba(255,255,255,0.4)' },
    '&.Mui-disabled fieldset': { borderColor: 'rgba(255,255,255,0.05)' }
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)', '&.Mui-focused': { color: '#a855f7' } },
  '& input:-webkit-autofill': { WebkitBoxShadow: '0 0 0 1000px #0f172a inset', WebkitTextFillColor: 'white', caretColor: 'white' },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' }
};

const PaymentGateway = ({ course, onPaymentSuccess, onCancel, amount, isVisible }) => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // E-commerce states
  const basePrice = amount || course?.price || 0;
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoStatus, setPromoStatus] = useState(null);
  const finalPrice = Math.max(0, basePrice - discount);

  // Form states
  const [basicDetails, setBasicDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    country: 'United States',
  });

  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiDetails, setUpiDetails] = useState({ upiId: '' });
  const [netBankingDetails, setNetBankingDetails] = useState({ bank: '', accountNumber: '', ifsc: '' });

  const steps = ['Basic Details', 'Payment Method', 'Payment Info', 'Confirm & Pay'];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard />, description: 'Pay with Visa, Mastercard, AMEX' },
    { id: 'upi', name: 'UPI Payment', icon: <Phone />, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: <AccountBalance />, description: 'Direct bank transfer' },
  ];

  const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Chase Bank', 'Bank of America'];
  const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France'];

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setActiveStep(2); // Jump to Payment Info step
    setError('');
  };

  const validateBasicDetails = () => {
    if (!basicDetails.fullName || basicDetails.fullName.trim().length < 3) return setError('Please enter your full name') || false;
    if (!basicDetails.email || !/^\S+@\S+\.\S+$/.test(basicDetails.email)) return setError('Please enter a valid email address') || false;
    if (!basicDetails.phone || basicDetails.phone.trim().length < 8) return setError('Please enter a valid phone number') || false;
    return true;
  };

  const validateCardDetails = () => {
    const { number, name, expiry, cvv } = cardDetails;
    if (!number || number.length !== 19) return setError('Please enter a valid 16-digit card number') || false;
    if (!name || name.trim().length < 3) return setError('Please enter the cardholder name') || false;
    if (!expiry || !expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) return setError('Please enter a valid expiry date (MM/YY)') || false;
    if (!cvv || cvv.length !== 3) return setError('Please enter a valid 3-digit CVV') || false;
    return true;
  };

  const validateUpiDetails = () => {
    if (!upiDetails.upiId || !upiDetails.upiId.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/)) return setError('Please enter a valid UPI ID') || false;
    return true;
  };

  const validateNetBankingDetails = () => {
    const { bank, accountNumber, ifsc } = netBankingDetails;
    if (!bank) return setError('Please select your bank') || false;
    if (!accountNumber || accountNumber.length < 9) return setError('Please enter a valid account number') || false;
    if (!ifsc || !ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) return setError('Please enter a valid IFSC code') || false;
    return true;
  };

  const validateCurrentStep = () => {
    setError('');
    if (activeStep === 0) return validateBasicDetails();
    if (activeStep === 1) return !!paymentMethod;
    if (activeStep === 2) {
      if (paymentMethod === 'card') return validateCardDetails();
      if (paymentMethod === 'upi') return validateUpiDetails();
      if (paymentMethod === 'netbanking') return validateNetBankingDetails();
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      const code = promoCode.toUpperCase();
      if (code === 'EDUNOVA50') {
        setDiscount(basePrice * 0.5);
        setPromoStatus({ type: 'success', message: '50% Off Special applied!' });
      } else if (code === 'WELCOME20') {
        setDiscount(basePrice * 0.2);
        setPromoStatus({ type: 'success', message: '20% off Welcome bonus applied!' });
      } else {
        setDiscount(0);
        setPromoStatus({ type: 'error', message: 'Invalid or expired promo code.' });
      }
      setProcessing(false);
    }, 800);
  };

  const processPayment = async () => {
    if (!validateCurrentStep()) return;
    setProcessing(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // 90% success rate
      if (Math.random() > 0.1) {
        setSuccess(true);
        if (onPaymentSuccess) {
          onPaymentSuccess({
            method: paymentMethod, amount: finalPrice, courseId: course?.id, transactionId: 'TXN' + Date.now(), date: new Date().toISOString(), promoApplied: discount > 0
          });
        }
      } else {
        setError('Payment failed remotely. Please try checking your details.');
        setActiveStep(2);
      }
    } catch (err) {
      setError('Payment processing error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(' ');
  };

  const renderBasicDetails = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
        Please confirm your billing details before we proceed to payment. This information will be used for your course invoice.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Full Name" value={basicDetails.fullName} onChange={(e) => setBasicDetails({ ...basicDetails, fullName: e.target.value })} sx={inputStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><Person sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment>) }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Email Address" type="email" value={basicDetails.email} onChange={(e) => setBasicDetails({ ...basicDetails, email: e.target.value })} sx={inputStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><Email sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment>) }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Phone Number" value={basicDetails.phone} onChange={(e) => setBasicDetails({ ...basicDetails, phone: e.target.value })} sx={inputStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><Phone sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment>) }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField select fullWidth label="Country" value={basicDetails.country} onChange={(e) => setBasicDetails({ ...basicDetails, country: e.target.value })} sx={inputStyles} InputProps={{ startAdornment: (<InputAdornment position="start"><Public sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment>) }} >
            {countries.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Grid>
      </Grid>
    </motion.div>
  );

  const renderPaymentMethodSelection = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <Grid container spacing={3}>
        {paymentMethods.map((method) => (
          <Grid item xs={12} sm={4} key={method.id}>
            <Card
              onClick={() => handlePaymentMethodSelect(method.id)}
              sx={{
                cursor: 'pointer', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)',
                border: paymentMethod === method.id ? '2px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease', color: 'white',
                '&:hover': { borderColor: '#a855f7', transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(168, 85, 247, 0.15)' },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: paymentMethod === method.id ? 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, color: 'white' }}>
                  {React.cloneElement(method.icon, { fontSize: 'large' })}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{method.name}</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>{method.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );

  const renderPaymentDetails = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      {paymentMethod === 'card' && (
        <Box sx={{ maxWidth: '500px', mx: 'auto' }}>
          <TextField fullWidth label="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })} placeholder="1234 5678 9012 3456" inputProps={{ maxLength: 19 }} sx={{ ...inputStyles, mb: 3 }} />
          <TextField fullWidth label="Cardholder Name" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} placeholder="John Doe" sx={{ ...inputStyles, mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField fullWidth label="Expiry Date" value={cardDetails.expiry} onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  setCardDetails({ ...cardDetails, expiry: value });
                }} placeholder="MM/YY" inputProps={{ maxLength: 5 }} sx={inputStyles} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })} placeholder="123" inputProps={{ maxLength: 3 }} type="password" sx={inputStyles} />
            </Grid>
          </Grid>
        </Box>
      )}
      
      {paymentMethod === 'upi' && (
        <Box sx={{ maxWidth: '500px', mx: 'auto' }}>
          <TextField fullWidth label="UPI ID" value={upiDetails.upiId} onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })} placeholder="yourname@upi" sx={{ ...inputStyles, mb: 3 }} />
          <Alert severity="info" sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.2)', '& .MuiAlert-icon': { color: '#60a5fa' } }}>
            You will receive a payment request on your UPI app. Please approve it within 5 minutes.
          </Alert>
        </Box>
      )}

      {paymentMethod === 'netbanking' && (
        <Box sx={{ maxWidth: '500px', mx: 'auto' }}>
          <TextField select fullWidth label="Select Bank" value={netBankingDetails.bank} onChange={(e) => setNetBankingDetails({ ...netBankingDetails, bank: e.target.value })} sx={{ ...inputStyles, mb: 3 }}>
            {banks.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
          </TextField>
          <TextField fullWidth label="Account Number" value={netBankingDetails.accountNumber} onChange={(e) => setNetBankingDetails({ ...netBankingDetails, accountNumber: e.target.value.replace(/\D/g, '') })} placeholder="Enter your 9-18 digit account number" sx={{ ...inputStyles, mb: 3 }} />
          <TextField fullWidth label="IFSC Code" value={netBankingDetails.ifsc} onChange={(e) => setNetBankingDetails({ ...netBankingDetails, ifsc: e.target.value.toUpperCase() })} placeholder="SBIN0001234" inputProps={{ maxLength: 11 }} sx={inputStyles} />
        </Box>
      )}
    </motion.div>
  );

  const renderConfirmation = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <Card sx={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 4, mb: 4, color: 'white' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#10b981', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle /> Payment Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Billed To:</Typography>
            <Typography sx={{ fontWeight: 600 }}>{basicDetails.fullName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Course Name:</Typography>
            <Typography sx={{ fontWeight: 600 }}>{course?.title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Method:</Typography>
            <Typography sx={{ fontWeight: 600 }}>{paymentMethods.find(m => m.id === paymentMethod)?.name}</Typography>
          </Box>
          
          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
          
          {/* Promo Code Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField 
                disabled={discount > 0}
                size="small" fullWidth 
                placeholder="PROMO CODE (Try: EDUNOVA50, WELCOME20)" 
                value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                sx={inputStyles} 
              />
              <Button 
                variant="outlined" 
                disabled={!promoCode.trim() || discount > 0 || processing}
                onClick={handleApplyPromo}
                sx={{ fontWeight: 700, borderColor: '#a855f7', color: '#a855f7', '&:hover': { bgcolor: 'rgba(168,85,247,0.1)', borderColor: '#9333ea' } }}
              >
                Apply
              </Button>
            </Box>
            {promoStatus && (
              <Typography variant="caption" sx={{ color: promoStatus.type === 'success' ? '#10b981' : '#ef4444', mt: 1, display: 'block', fontWeight: 600 }}>
                {promoStatus.message}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Subtotal:</Typography>
            <Typography sx={{ fontWeight: 600 }}>₹{basePrice.toFixed(2)}</Typography>
          </Box>
          
          {discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: '#10b981' }}>
              <Typography sx={{ fontWeight: 600 }}>Discount ({promoCode}):</Typography>
              <Typography sx={{ fontWeight: 700 }}>-₹{discount.toFixed(2)}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Total Due</Typography>
            <Typography variant="h4" sx={{ color: '#a855f7', fontWeight: 900 }}>₹{finalPrice.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
        <Security sx={{ color: '#10b981' }} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Your payment is secured with industry-standard 256-bit AES encryption.
        </Typography>
      </Box>
    </motion.div>
  );

  return (
    <>
      {success && (
        <Dialog open={isVisible} maxWidth="md" PaperProps={{ sx: { background: '#0f172a', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 5, color: 'white' } }}>
          <DialogContent sx={{ textAlign: 'center', p: { xs: 4, md: 8 } }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}>
              <CheckCircle sx={{ fontSize: '100px', color: '#10b981', mb: 3 }} />
            </motion.div>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: 'white' }}>Payment Successful!</Typography>
            <Typography variant="h6" sx={{ mb: 5, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
              Your enrollment in <Box component="span" sx={{ color: '#10b981', fontWeight: 700 }}>{course?.title}</Box> is confirmed.
            </Typography>
            <Button variant="contained" onClick={onCancel} size="large" sx={{ px: 6, py: 1.5, fontSize: '1.1rem', borderRadius: 3, fontWeight: 800, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', '&:hover': { transform: 'translateY(-2px)' } }}>
              Start Learning Now
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {!success && (
        <Dialog open={isVisible} maxWidth="md" fullWidth PaperProps={{ sx: { background: '#0f172a', backgroundImage: 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.15), transparent 400px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5, color: 'white', overflow: 'hidden' } }}>
          <DialogTitle sx={{ p: 4, pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Lock sx={{ color: '#a855f7', fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Secure Checkout</Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ p: { xs: 3, md: 5 }, pt: '10px !important' }}>
            <Stepper activeStep={activeStep} sx={{ mb: 6, '& .MuiStepLabel-label': { color: 'rgba(255,255,255,0.4)', fontWeight: 600 }, '& .MuiStepLabel-label.Mui-active': { color: '#a855f7' }, '& .MuiStepLabel-label.Mui-completed': { color: '#10b981' }, '& .MuiStepIcon-root': { color: 'rgba(255,255,255,0.1)' }, '& .MuiStepIcon-root.Mui-active': { color: '#a855f7' }, '& .MuiStepIcon-root.Mui-completed': { color: '#10b981' } }}>
              {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
            </Stepper>

            {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 3, bgcolor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', '& .MuiAlert-icon': { color: '#f87171' } }}>{error}</Alert>}

            <Box sx={{ minHeight: '300px' }}>
              <AnimatePresence mode="wait">
                {activeStep === 0 && <Box key="step0">{renderBasicDetails()}</Box>}
                {activeStep === 1 && <Box key="step1">{renderPaymentMethodSelection()}</Box>}
                {activeStep === 2 && <Box key="step2">{renderPaymentDetails()}</Box>}
                {activeStep === 3 && <Box key="step3">{renderConfirmation()}</Box>}
              </AnimatePresence>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: { xs: 3, md: 4 }, bgcolor: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Button onClick={onCancel} disabled={processing} sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.05)' } }}>
              Cancel
            </Button>
            
            <Box sx={{ flexGrow: 1 }} />
            
            {activeStep > 0 && (
              <Button onClick={handleBack} disabled={processing} sx={{ mr: 2, color: 'white', borderColor: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>
                Back
              </Button>
            )}
            
            {activeStep < 3 ? (
              <Button onClick={handleNext} variant="contained" sx={{ px: 4, py: 1.2, fontWeight: 700, borderRadius: 2, background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)', boxShadow: '0 8px 20px rgba(236,72,153,0.3)', '&:hover': { background: 'linear-gradient(135deg, #4338ca 0%, #db2777 100%)' } }}>
                {activeStep === 0 ? 'Continue to Payment' : 'Proceed'}
              </Button>
            ) : (
              <Button onClick={processPayment} variant="contained" disabled={processing} sx={{ px: 5, py: 1.2, fontWeight: 800, borderRadius: 2, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 8px 20px rgba(16,185,129,0.3)', '&:hover': { background: '#047857' } }}>
                {processing ? 'Processing Securely...' : `Pay ₹${finalPrice.toFixed(2)}`}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PaymentGateway;
