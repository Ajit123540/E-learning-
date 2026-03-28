import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import api from '../../services/api';
import { useAuth } from '../../store/AuthContext';
import AdminAnalytics from '../../components/AdminAnalytics';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  
  // Resources State
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('note');
  const [file, setFile] = useState(null);

  // Exams State
  const [exams, setExams] = useState([]);
  const [examTitle, setExamTitle] = useState('');
  const [examDuration, setExamDuration] = useState(60);
  const [questions, setQuestions] = useState([
    { id: 1, text: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);
  const [examLoading, setExamLoading] = useState(false);

  useEffect(() => {
    fetchResources();
    fetchExams();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources');
      setResources(response.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await api.get('/exams');
      setExams(response.data);
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError(null);
    setSuccess(null);
  };

  // --- RESOURCE HANDLERS ---
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSuccess(null);

    if (!title || !file) {
      setError('Title and File are required');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('file', file);

    try {
      await api.post('/resources', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(`${type === 'note' ? 'Note' : 'Assignment'} uploaded successfully!`);
      setTitle(''); setDescription(''); setType('note'); setFile(null);
      fetchResources();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload resource');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await api.delete(`/resources/${id}`);
        setSuccess('Resource deleted successfully.');
        fetchResources();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete resource');
      }
    }
  };

  // --- EXAM HANDLERS ---
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, text: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleExamSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSuccess(null);

    // Validate
    if (!examTitle) return setError('Exam title is required');
    for (let q of questions) {
      if (!q.text) return setError(`Question text is missing in Question ${q.id}`);
      if (q.options.some(opt => !opt)) return setError(`All options must be filled in Question ${q.id}`);
    }

    setExamLoading(true);
    try {
      await api.post('/exams', {
        title: examTitle,
        duration: examDuration,
        questions: questions.map(q => ({
          id: q.id.toString(),
          text: q.text,
          options: q.options,
          correctAnswer: q.options[q.correctAnswer] // Store string value of correct answer
        }))
      });
      setSuccess('Exam created successfully!');
      setExamTitle(''); setExamDuration(60);
      setQuestions([{ id: 1, text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
      fetchExams();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create exam');
    } finally {
      setExamLoading(false);
    }
  };

  const handleToggleExam = async (id, currentStatus) => {
    try {
      await api.put(`/exams/${id}`, { isActive: !currentStatus });
      fetchExams();
    } catch (err) {
      console.error(err);
      setError('Failed to toggle exam status');
    }
  };

  const handleDeleteExam = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await api.delete(`/exams/${id}`);
        setSuccess('Exam deleted successfully.');
        fetchExams();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete exam');
      }
    }
  };

  // --- RENDERING ---
  if (user?.role !== 'admin' && user?.role !== 'instructor') {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Alert severity="error">Access Denied: You must be an admin or instructor to view this page.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 12 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage platform learning resources and examinations.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Financials & Analytics" />
          <Tab label="Review Resources (Notes/Assignments)" />
          <Tab label="Manage Exams" />
        </Tabs>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      {/* --- ANALYTICS TAB --- */}
      <CustomTabPanel value={tabValue} index={0}>
        <AdminAnalytics />
      </CustomTabPanel>

      {/* --- RESOURCES TAB --- */}
      <CustomTabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Upload Form */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, flex: 1, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Create Material</Typography>
            <Box component="form" onSubmit={handleResourceSubmit} sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="type-label">Resource Type</InputLabel>
                <Select labelId="type-label" value={type} label="Resource Type" onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="note">Course Note</MenuItem>
                  <MenuItem value="assignment">Assignment</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 3 }} required />
              <TextField fullWidth label="Description (Optional)" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 3 }} />
              <Box sx={{ mb: 4 }}>
                <Button variant="outlined" component="label" fullWidth sx={{ p: 2, borderStyle: 'dashed', borderWidth: 2 }}>
                  {file ? file.name : 'Select File to Upload*'}
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={loading || !title || !file} sx={{ py: 1.5 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : `Upload ${type === 'note' ? 'Note' : 'Assignment'}`}
              </Button>
            </Box>
          </Paper>

          {/* Resource List */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, flex: 1, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', overflowY: 'auto', maxHeight: '70vh' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Uploaded Resources</Typography>
            {fetchLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
            ) : resources.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No resources found.</Typography>
            ) : (
              <List sx={{ mt: 2 }}>
                {resources.map((resource, index) => (
                  <React.Fragment key={resource.id}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={600}>
                            {resource.title}
                            <Box component="span" sx={{ ml: 1, px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', bgcolor: resource.type === 'note' ? 'primary.light' : 'secondary.light', color: 'white', textTransform: 'uppercase' }}>
                              {resource.type}
                            </Box>
                          </Typography>
                        }
                        secondary={<Typography variant="body2" color="text.secondary">{resource.fileName}</Typography>}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" component="a" href={`http://localhost:5000${resource.fileUrl}`} target="_blank" rel="noopener noreferrer" sx={{ mr: 1 }}><DownloadIcon color="primary" /></IconButton>
                        <IconButton edge="end" onClick={() => handleDeleteResource(resource.id)}><DeleteIcon color="error" /></IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </CustomTabPanel>

      {/* --- EXAMS TAB --- */}
      <CustomTabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Exam Builder Form */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, flex: 2, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Create New Exam</Typography>
            <Box component="form" onSubmit={handleExamSubmit} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField fullWidth label="Exam Title" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} required />
                <TextField type="number" label="Duration (mins)" value={examDuration} onChange={(e) => setExamDuration(e.target.value)} sx={{ width: 150 }} required />
              </Box>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>Questions</Typography>
              {questions.map((q, qIndex) => (
                <Paper key={qIndex} variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f9fafb' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>Question {qIndex + 1}</Typography>
                  <TextField fullWidth label="Question Text" value={q.text} onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)} sx={{ mb: 2, bgcolor: 'white' }} required />
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                    {q.options.map((opt, optIndex) => (
                      <TextField key={optIndex} size="small" label={`Option ${optIndex + 1}`} value={opt} onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)} required sx={{ bgcolor: 'white' }} />
                    ))}
                  </Box>
                  
                  <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                    <InputLabel>Correct Option</InputLabel>
                    <Select value={q.correctAnswer} label="Correct Option" onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}>
                      <MenuItem value={0}>Option 1</MenuItem>
                      <MenuItem value={1}>Option 2</MenuItem>
                      <MenuItem value={2}>Option 3</MenuItem>
                      <MenuItem value={3}>Option 4</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              ))}

              <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleAddQuestion} sx={{ mb: 4 }}>
                Add Another Question
              </Button>

              <Button type="submit" variant="contained" color="secondary" fullWidth size="large" disabled={examLoading} sx={{ py: 1.5 }}>
                {examLoading ? <CircularProgress size={24} color="inherit" /> : 'Publish Exam Draft'}
              </Button>
            </Box>
          </Paper>

          {/* Exam List */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, flex: 1, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', overflowY: 'auto', maxHeight: '85vh' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Manage Existing Exams</Typography>
            <Typography variant="caption" color="text.secondary" paragraph>Toggle switch to start/stop exams for students.</Typography>
            
            {exams.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No exams found.</Typography>
            ) : (
              <List sx={{ mt: 2 }}>
                {exams.map((exam, index) => (
                  <React.Fragment key={exam.id}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem alignItems="flex-start" sx={{ py: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={700} color={exam.isActive ? 'success.main' : 'text.primary'}>
                          {exam.title}
                        </Typography>
                        <IconButton edge="end" size="small" onClick={() => handleDeleteExam(exam.id)}><DeleteIcon color="error" fontSize="small" /></IconButton>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {exam.questions?.length || 0} Questions • {exam.duration} mins
                      </Typography>

                      <FormControlLabel
                        control={
                          <Switch 
                            checked={exam.isActive}
                            onChange={() => handleToggleExam(exam.id, exam.isActive)}
                            color="success"
                          />
                        }
                        label={
                          <Typography variant="body2" fontWeight={600} color={exam.isActive ? 'success.main' : 'text.secondary'}>
                            {exam.isActive ? 'Started (Active)' : 'Draft (Inactive)'}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </CustomTabPanel>
    </Container>
  );
};

export default AdminDashboard;
