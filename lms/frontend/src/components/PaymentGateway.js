import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CreditCard,
  AccountBalance,
  Phone,
  CheckCircle,
  Error,
  Info,
  Lock,
  Security,
} from '@mui/icons-material';

const PaymentGateway = ({ 
  course, 
  onPaymentSuccess, 
  onCancel,
  amount,
  isVisible 
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form states
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  
  const [upiDetails, setUpiDetails] = useState({
    upiId: '',
  });
  
  const [netBankingDetails, setNetBankingDetails] = useState({
    bank: '',
    accountNumber: '',
    ifsc: '',
  });

  const steps = ['Select Payment Method', 'Enter Details', 'Confirm & Pay'];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard />,
      description: 'Pay with Visa, Mastercard, Rupay',
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <Phone />,
      description: 'Pay with Google Pay, PhonePe, Paytm',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <AccountBalance />,
      description: 'Pay directly from your bank account',
    },
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
  ];

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setActiveStep(1);
    setError('');
  };

  const validateCardDetails = () => {
    const { number, name, expiry, cvv } = cardDetails;
    
    if (!number || number.length !== 16) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    
    if (!name || name.trim().length < 3) {
      setError('Please enter the cardholder name');
      return false;
    }
    
    if (!expiry || !expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    
    if (!cvv || cvv.length !== 3) {
      setError('Please enter a valid 3-digit CVV');
      return false;
    }
    
    return true;
  };

  const validateUpiDetails = () => {
    if (!upiDetails.upiId || !upiDetails.upiId.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/)) {
      setError('Please enter a valid UPI ID');
      return false;
    }
    return true;
  };

  const validateNetBankingDetails = () => {
    const { bank, accountNumber, ifsc } = netBankingDetails;
    
    if (!bank) {
      setError('Please select your bank');
      return false;
    }
    
    if (!accountNumber || accountNumber.length < 9) {
      setError('Please enter a valid account number');
      return false;
    }
    
    if (!ifsc || !ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      setError('Please enter a valid IFSC code');
      return false;
    }
    
    return true;
  };

  const validateCurrentStep = () => {
    switch (paymentMethod) {
      case 'card':
        return validateCardDetails();
      case 'upi':
        return validateUpiDetails();
      case 'netbanking':
        return validateNetBankingDetails();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (activeStep === 1 && !validateCurrentStep()) {
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const processPayment = async () => {
    setProcessing(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment success (90% success rate)
      if (Math.random() > 0.1) {
        setSuccess(true);
        if (onPaymentSuccess) {
          onPaymentSuccess({
            method: paymentMethod,
            amount: amount || course?.price || 0,
            courseId: course?.id,
            transactionId: 'TXN' + Date.now(),
            date: new Date().toISOString(),
          });
        }
      } else {
        setError('Payment failed. Please try again.');
        setActiveStep(1);
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const renderPaymentMethodSelection = () => (
    <Grid container spacing={2}>
      {paymentMethods.map((method) => (
        <Grid item xs={12} sm={4} key={method.id}>
          <Card
            onClick={() => handlePaymentMethodSelect(method.id)}
            sx={{
              cursor: 'pointer',
              border: paymentMethod === method.id ? '2px solid #3a86ff' : '1px solid #e5e7eb',
              '&:hover': {
                borderColor: '#3a86ff',
                boxShadow: '0 4px 12px rgba(58, 134, 255, 0.15)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ fontSize: 40, color: '#3a86ff', mb: 2 }}>
                {method.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {method.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                {method.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderCardDetails = () => (
    <Box>
      <TextField
        fullWidth
        label="Card Number"
        value={cardDetails.number}
        onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
        placeholder="1234 5678 9012 3456"
        inputProps={{ maxLength: 19 }}
        sx={{ mb: 2 }}
      />
      
      <TextField
        fullWidth
        label="Cardholder Name"
        value={cardDetails.name}
        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
        placeholder="John Doe"
        sx={{ mb: 2 }}
      />
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Expiry Date"
            value={cardDetails.expiry}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
              }
              setCardDetails({ ...cardDetails, expiry: value });
            }}
            placeholder="MM/YY"
            inputProps={{ maxLength: 5 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="CVV"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
            placeholder="123"
            inputProps={{ maxLength: 3 }}
            type="password"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderUpiDetails = () => (
    <Box>
      <TextField
        fullWidth
        label="UPI ID"
        value={upiDetails.upiId}
        onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
        placeholder="yourname@upi"
        sx={{ mb: 2 }}
      />
      
      <Alert severity="info" sx={{ mb: 2 }}>
        You will receive a payment request on your UPI app. Please approve it to complete the payment.
      </Alert>
    </Box>
  );

  const renderNetBankingDetails = () => (
    <Box>
      <TextField
        fullWidth
        select
        label="Select Bank"
        value={netBankingDetails.bank}
        onChange={(e) => setNetBankingDetails({ ...netBankingDetails, bank: e.target.value })}
        sx={{ mb: 2 }}
        SelectProps={{ native: true }}
      >
        <option value="">Select your bank</option>
        {banks.map((bank) => (
          <option key={bank} value={bank}>
            {bank}
          </option>
        ))}
      </TextField>
      
      <TextField
        fullWidth
        label="Account Number"
        value={netBankingDetails.accountNumber}
        onChange={(e) => setNetBankingDetails({ ...netBankingDetails, accountNumber: e.target.value.replace(/\D/g, '') })}
        placeholder="Enter your account number"
        sx={{ mb: 2 }}
      />
      
      <TextField
        fullWidth
        label="IFSC Code"
        value={netBankingDetails.ifsc}
        onChange={(e) => setNetBankingDetails({ ...netBankingDetails, ifsc: e.target.value.toUpperCase() })}
        placeholder="SBIN0001234"
        sx={{ mb: 2 }}
      />
    </Box>
  );

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'card':
        return renderCardDetails();
      case 'upi':
        return renderUpiDetails();
      case 'netbanking':
        return renderNetBankingDetails();
      default:
        return null;
    }
  };

  const renderConfirmation = () => (
    <Box>
      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Payment Summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Course:</Typography>
          <Typography sx={{ fontWeight: 600 }}>{course?.title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Payment Method:</Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {paymentMethods.find(m => m.id === paymentMethod)?.name}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Total Amount:</Typography>
          <Typography variant="h6" sx={{ color: '#3a86ff', fontWeight: 700 }}>
            ₹{amount || course?.price || 0}
          </Typography>
        </Box>
      </Alert>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Security />
          <Typography variant="body2">
            Your payment is secured with 256-bit SSL encryption. We never store your card details.
          </Typography>
        </Box>
      </Alert>
    </Box>
  );

  if (success) {
    return (
      <Dialog open={isVisible} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          <CheckCircle sx={{ fontSize: '80px', color: '#10b981', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#10b981' }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Your enrollment in "{course?.title}" has been confirmed. You can now access the course content.
          </Typography>
          <Button
            variant="contained"
            onClick={onCancel}
            sx={{
              background: 'linear-gradient(45deg, #10b981, #3a86ff)',
              fontWeight: 600,
            }}
          >
            Start Learning
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isVisible} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lock sx={{ color: '#3a86ff' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Secure Payment
          </Typography>
          <Tooltip title="Your payment information is encrypted and secure">
            <Info sx={{ color: '#6b7280', fontSize: '20px' }} />
          </Tooltip>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && renderPaymentMethodSelection()}
        {activeStep === 1 && renderPaymentDetails()}
        {activeStep === 2 && renderConfirmation()}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onCancel} disabled={processing}>
          Cancel
        </Button>
        
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={processing}>
            Back
          </Button>
        )}
        
        {activeStep < 2 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={processing || (activeStep === 0 && !paymentMethod)}
            sx={{
              background: 'linear-gradient(45deg, #ff006e, #8338ec)',
            }}
          >
            {activeStep === 0 ? 'Continue' : 'Review Payment'}
          </Button>
        ) : (
          <Button
            onClick={processPayment}
            variant="contained"
            disabled={processing}
            sx={{
              background: 'linear-gradient(45deg, #10b981, #3a86ff)',
            }}
          >
            {processing ? 'Processing...' : `Pay ₹${amount || course?.price || 0}`}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PaymentGateway;
