import React from 'react';

const NotAvailable = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '100px 20px',
      fontFamily: 'Arial, sans-serif',
    },
    message: {
      fontSize: '1.8rem',
      color: '#555',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.message}>
        This Page is Undercostruction. Please visit later.
      </div>
    </div>
  );
};

export default NotAvailable;
