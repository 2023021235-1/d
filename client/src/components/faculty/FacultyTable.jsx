import React, { useState } from 'react';
import './styles/FacultyProfile.css';

const FacultyTable = ({ title, data = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Get all possible columns from the data
  const getColumns = () => {
    if (data.length === 0) return [];
    const allKeys = new Set();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'id' && key !== 'faculty_id' && key !== 'photo' && key !== 'resume') {
          allKeys.add(key);
        }
      });
    });
    return Array.from(allKeys);
  };

  const columns = getColumns();

  // Format column header (capitalize and replace underscores with spaces)
  const formatHeader = (header) => {
    return header
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  // Apply search filter
  const filteredData = sortedData.filter(item => {
    return Object.values(item).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="faculty-table-container">
      <h2>{title}</h2>
      
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      {data.length > 0 ? (
        <div className="table-responsive">
          <table className="faculty-table">
            <thead>
              <tr>
                {columns.map(column => (
                  <th 
                    key={column} 
                    onClick={() => requestSort(column)}
                    className={sortConfig.key === column ? sortConfig.direction : ''}
                  >
                    {formatHeader(column)}
                    {sortConfig.key === column && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  {columns.map(column => (
                    <td key={`${index}-${column}`}>
                      {item[column] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data">No data available</div>
      )}
    </div>
  );
};

export default FacultyTable;