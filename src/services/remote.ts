// Thin client for the serverless / local API. Never touches Supabase keys.

let adminToken: string | null = localStorage.getItem('bahasa_xii_admin_token');

export const setAdminToken = (token: string | null) => {
  adminToken = token;
  if (token) localStorage.setItem('bahasa_xii_admin_token', token);
  else localStorage.removeItem('bahasa_xii_admin_token');
};

const adminHeaders = (): HeadersInit =>
  adminToken ? { 'x-admin-token': adminToken } : {};

export interface RemoteStudent {
  id: string;
  name: string;
  className: string;
  lastActive: string;
  testsCompleted: number;
  averageScore: number;
  highestScore: number;
  latestExamResult: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    date: string;
  } | null;
}

export interface RemoteActivity {
  id: string;
  name: string;
  className: string;
  activityType: string;
  title: string | null;
  score: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  timestamp: string;
}

export const adminLoginRequest = async (
  username: string,
  password: string
): Promise<string | null> => {
  const res = await fetch('/api/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data?.ok || !data?.token) return null;
  setAdminToken(data.token as string);
  return data.token as string;
};

export const recordStudentLogin = async (name: string, className: string): Promise<void> => {
  try {
    await fetch('/api/student-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, className })
    });
  } catch (e) {
    console.warn('student-login request failed, offline mode', e);
  }
};

export interface ResultInput {
  name: string;
  className: string;
  activityType: string;
  title: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
}

export const submitResultRequest = async (payload: ResultInput): Promise<boolean> => {
  try {
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (e) {
    console.warn('results request failed', e);
    return false;
  }
};

export class AdminSessionExpiredError extends Error {
  constructor() {
    super('admin-expired');
  }
}

const handleAdminStatus = (status: number) => {
  if (status === 401) {
    setAdminToken(null);
    throw new AdminSessionExpiredError();
  }
};

export const fetchAdminStudents = async (): Promise<RemoteStudent[]> => {
  const res = await fetch('/api/admin-students', { headers: adminHeaders() });
  handleAdminStatus(res.status);
  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  const data = await res.json();
  return data.students || [];
};

export const fetchAdminActivity = async (): Promise<RemoteActivity[]> => {
  const res = await fetch('/api/admin-activity', { headers: adminHeaders() });
  handleAdminStatus(res.status);
  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  const data = await res.json();
  return data.activity || [];
};

export const deleteStudentRequest = async (name: string, className: string): Promise<void> => {
  const res = await fetch('/api/admin-delete-student', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
    body: JSON.stringify({ name, className })
  });
  handleAdminStatus(res.status);
  if (!res.ok) throw new Error(`Server returned ${res.status}`);
};