import React from 'react';
import { registerAdmin, getAdmins } from './userComponent';
import { registerClerk } from './userComponent';
import { getCafeByUserId } from './cafeComponent';
import CreatorAndLister from './CreatorAndLister';

const SuperAdminComponent = () => {
  const inputs = [
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'text', name: 'username', placeholder: 'Username' },
    { type: 'password', name: 'password', placeholder: 'Password' },
  ];

  const renderUserItem = (user) => {
    return user.username;
  };

  return (
    <CreatorAndLister
      title="Super Admin Page"
      createFunction={(data, id) => registerAdmin(data)}
      listItems={getAdmins}
      renderItem={(user) => user.username}
      buttonText="Create Admin"
      inputs={inputs}
      itemIdKey="userId"
      layers={[
          (selectedUser) => ( // Layer 2 example
              <CreatorAndLister
                  title="Cafes"
                  listItems={() => getCafeByUserId(selectedUser.userId)}
                  renderItem={(cafe) => cafe.name}
                  inputs={inputs}
                  parentData={selectedUser}
              />
          ),
          // Add additional layers as needed
      ]}
    />
  );
};

export default SuperAdminComponent;
