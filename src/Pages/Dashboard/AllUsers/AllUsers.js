import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllUsers = () => {
    const [deletingUsers, setDeletingUsers] = useState(null);
    const closeModal = () => {
        setDeletingUsers(null);
    }

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:12000/users');
            const data = await res.json();
            return data;
        }

    })

    const handleDeleteUser = user => {
        fetch(`http://localhost:12000/users/${user._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`User ${user.name} deleted successfully`)

                }
            })
    }

    const handleMakeAdmin = id => {
        fetch(`http://localhost:12000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful')
                    refetch()
                }
            })
    }

    return (
        <div>
            <h2 className='text-3xl mb-10 font-semibold'>All Users</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                                <td>
                                    <label onClick={() => setDeletingUsers(user)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingUsers && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingUsers.name}. You will not be able to recover any data!`}
                    successAction={handleDeleteUser}
                    successButtonName="Delete"
                    modalData={deletingUsers}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>


    );
};

export default AllUsers;