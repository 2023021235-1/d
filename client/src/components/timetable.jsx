import React from 'react';

const TimeTable = () => {
  const styles = {
    headTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '1.5rem 0',
    },
    pageContent: {
      padding: '0 2rem',
      textAlign: 'center',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      margin: '1rem 0',
    },
    link: {
      fontSize: '1.1rem',
      textDecoration: 'none',
      color: '#007bff',
    },
  };

  return (
    <div>
      <div style={styles.headTitle}>TIME TABLE</div>
      <div style={styles.pageContent}>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <a
              href="/assets/docs/Time_Table_BA.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Time Table BA
            </a>
          </li>
          <li style={styles.listItem}>
            <a
              href="/assets/docs/Time_Table_BSc.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Time Table B.Sc.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TimeTable;
