import { Search } from 'lucide-react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { useFirebase } from '../../context/Firebase';
import React, { useEffect, useState } from 'react'

export default function UsersTable() {
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchItem, setSearchItem] = useState("");
    const [filterData, setFilterData] = useState([]);
    const firebase = useFirebase();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await firebase.getAllUsers();
        setUserData(users);
        setFilterData(users);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setUserData([]);
        setFilterData([]);
      } finally{
        setLoading(false)
      } 
    };

    useEffect(() => {
      fetchUsers();
    }, [firebase])

    useEffect(() => {
          const term = searchItem.toLowerCase().trim();
    
          if (!term) {
            setFilterData(userData);
            return;
          }
    
          const filtered = userData.filter((user) => {
            const name = user.name?.toLowerCase() || "";
            const email = user.email?.toLowerCase() || "";
    
            return (
              name.includes(term) ||
              email.includes(term) 
            );
          });
    
          setFilterData(filtered);
        }, [searchItem, userData]);
    
        if (loading) {
          return <div>Loading...</div>;
        }

        const handleInputChange = (e) => {
          const searchTerm = e.target.value;
          setSearchItem(searchTerm);
        };

  return (
    <div>
      <div className="relative overflow-x-auto bg-background shadow-xs rounded-base border border-border ">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4">
          <label htmlFor="input-group-1" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute text-input-placeholder inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="pr-2" />
            </div>
            <input
              type="text"
              value={searchItem}
              onChange={handleInputChange}
              id="input-group-1"
              className="block w-full max-w-96 ps-9 pe-3 py-2 bg-input-bg border border-input-border text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              placeholder="Search"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-card border-b border-t border-border">
            <tr>
              <th scope="col" className="px-6 py-3 font-body">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Joined on
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Role
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData.length === 0 ? (
              <p className="col-span-full text-center text-text-secondary p-6">
                No Matching Users found
              </p>
            ) : (
              filterData.map((user) => (
                <tr
                  key={user.id}
                  className="bg-background border-b border-border hover:bg-card"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-heading whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.userPhoto}
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-body">{user.email}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {user?.createdAt?.toDate().toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(user)}
                      data-modal-target="crud-modal"
                      data-modal-toggle="crud-modal"
                      className="font-medium text-brand hover:underline cursor-pointer"
                    >
                      Edit user
                    </button>
                    {selectedUser && (
                      <Modal
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                        onSave={fetchUsers}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
