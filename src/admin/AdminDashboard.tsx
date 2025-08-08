import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7032/api';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: number;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Send mail overlay state
  const [sendingMailUserId, setSendingMailUserId] = useState<string | null>(null);
  const [showSendMailOverlay, setShowSendMailOverlay] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${API_BASE_URL}/User`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/User/${userToDelete.id}`);
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSendMail = async (user: User) => {
    try {
      setSendingMailUserId(user.id);
      setShowSendMailOverlay(true);

      const payload = {
        name: user.name ?? '',
        email: user.email ?? '',
        emailTypes: 1,
      };

      await axios.post(`${API_BASE_URL}/SendMail/Send-Mail`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert(`Mail sent to ${user.email}`);
    } catch (error) {
      console.error('Error sending mail:', error);
      alert('Failed to send mail.');
    } finally {
      setShowSendMailOverlay(false);
      setSendingMailUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8 relative">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6">Welcome to the Admin Panel!</p>

      {loadingUsers ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded shadow-sm">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Password</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{`User ${String(index + 1).padStart(3, '0')}`}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.password}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-60"
                      onClick={() => openDeleteModal(user)}
                      disabled={deleting}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-60"
                      onClick={() => handleSendMail(user)}
                      disabled={!!sendingMailUserId}
                      title="Send Mail"
                    >
                      {sendingMailUserId === user.id ? 'Sending...' : 'Send Mail'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && userToDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Delete user</h2>
            </div>
            <div className="px-6 py-4">
              <p>
                Are you sure you want to delete{' '}
                <span className="font-semibold">{userToDelete.name}</span>?
              </p>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded border"
                onClick={closeDeleteModal}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Send Mail Waiting Overlay */}
      {showSendMailOverlay && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded px-6 py-4 shadow">
            <p className="text-lg font-medium">Sending mail… please wait</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
