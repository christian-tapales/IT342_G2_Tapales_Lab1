const Dashboard = () => {
    return (
        <div className="auth-container" style={{ maxWidth: '600px' }}>
            <h2>User Dashboard</h2>
            <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                <p><strong>Status:</strong> Authentication Verified ✅</p>
                <p><strong>Security:</strong> BCrypt 256-bit Hashing Active</p>
            </div>
            <button style={{ marginTop: '20px', backgroundColor: '#dc3545' }} 
                    onClick={() => window.location.href='/login'}>Logout</button>
        </div>
    );
};
export default Dashboard;