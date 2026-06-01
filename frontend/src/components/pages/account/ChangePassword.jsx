import React from 'react'
import DashboardLayout from '../../common/DashboardLayout';
import { Lock } from 'lucide-react';

const ChangePassword = () => {
  return (
    <DashboardLayout 
        title={<><Lock size={28} style={{ color: '#6366F1', marginRight: 10 }} /> Security Settings</>}
        subtitle="Manage your account security and change your password."
    >
      <div className="card border-0 p-4 mt-3" style={{ borderRadius: 24, boxShadow: '0 4px 25px rgba(0,0,0,0.03)' }}>
        <h5 className="fw-bold mb-4">Change Password</h5>
        <div style={{ maxWidth: 500 }}>
            <div className="mb-3">
                <label className="form-label small fw-semibold">Current Password</label>
                <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label small fw-semibold">New Password</label>
                <input type="password" className="form-control" />
            </div>
            <div className="mb-4">
                <label className="form-label small fw-semibold">Confirm New Password</label>
                <input type="password" className="form-control" />
            </div>
            <button className="btn btn-primary rounded-pill px-4 fw-bold">Update Password</button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ChangePassword
