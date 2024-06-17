import React from 'react';
import CreatorAndLister from './CreatorAndLister';
import { createCafe, getMyCafes } from './cafeComponent';
import { registerClerk, getClerks } from './userComponent';

const AdminComponent = () => {
  const clerkInputs = [
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'text', name: 'username', placeholder: 'Username' },
    { type: 'password', name: 'password', placeholder: 'Password' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Page</h1>
      <CreatorAndLister
        title="Cafes"
        createFunction={(data, id) => createCafe(data)}
        listItems={getMyCafes}
        renderItem={(cafe) => cafe.name}
        buttonText="Create Cafe"
        inputs={[{ type: 'text', name: 'name', placeholder: 'Cafe Name' }]}
        itemIdKey="cafeId"
        layers={[
            (selectedCafe) => ( // Layer 2 example
                <CreatorAndLister
                    title="Clerks"
                    createFunction={(data) => registerClerk(data, selectedCafe.cafeId)}
                    listItems={() => getClerks(selectedCafe.cafeId)}
                    renderItem={(clerk) => clerk.username}
                    buttonText="Register"
                    inputs={clerkInputs}
                    parentData={selectedCafe} // Pass the selected cafe data as props
                    itemIdKey="clerkId"
                />
            ),
            // Add additional layers as needed
        ]}
      />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
  },
};

export default AdminComponent;
