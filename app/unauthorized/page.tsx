export default function UnauthorizedPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '2rem' }}>Access Denied</h1>
      <p>Bhai, aapke paas is portal ka access nahi hai.</p>
      <a href="http://localhost:3000/login" style={{ marginTop: '20px', color: 'blue', textDecoration: 'underline' }}>
        Wapas Login karein
      </a>
    </div>
  );
}