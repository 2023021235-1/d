// src/components/ViewNews.jsx
import React, { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import "./styles/ViewNews.css";

const BASE_URL = encodeURI("http://localhost:8000");

const ViewNews = () => {
  const [items, setItems] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", type: "News", file: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/news/viewNews`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const data = await res.json();
      const combined = [...(data.send || []), ...(data.header_marquee_data || [])];
      setItems(combined);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => !filterType || item.Type === filterType);

  const handleDelete = async (id, link) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const fileSegment = link ? `/${encodeURIComponent(link)}` : "";
      const url = `${BASE_URL}/news/delete_news/${id}${fileSegment}`;
      console.log("Delete URL:", url);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (!res.ok) {
        console.error("Delete failed:", res.status, res.statusText);
        return;
      }

      const data = await res.json();
      console.log("Delete response payload:", data);

      fetchData();

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({ title: "", type: "News", file: null });
  };

  const handleFormChange = e => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("type", formData.type);
    if (formData.file) payload.append("myfile", formData.file);

    try {
      const res = await fetch(`${BASE_URL}/news/uploadnews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      });
      if (res.ok) {
        fetchData();
        // The original code was adding newItem to state, but fetchData already refreshes.
        // If your backend returns the newly created item, and you want to add it without
        // refetching all, you can keep the line below:
        // const newItem = await res.json();
        // setItems(prev => [newItem, ...prev]);
        closeModal();
      } else console.error("Upload failed");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="view-news-container">
      <div className="header-row">
        <h2>News/Events/Marquee</h2>
        <button className="add-button" onClick={openModal}>
          <Plus size={20} />
        </button>
      </div>

      <div className="content-row">
        <div className="main-content">
          <div className="filters">
            <label htmlFor="typeFilter">Filter by Type:</label>
            <select
              id="typeFilter"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="News">News</option>
              <option value="Events">Events</option>
              <option value="Marquee">Marquee</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-container">
              <p>Loading...</p>
            </div>
          ) : (
            <table className="news-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>CreatedAt</th>
                  <th>Link</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length ? (
                  filteredItems.map(row => (
                    <tr key={row.Id}>
                      <td>{row.Title}</td>
                      <td>
                        <span className={`type-badge ${row.Type.toLowerCase()}`}>
                          {row.Type}
                        </span>
                      </td>
                      <td>{new Date(row.CreatedAt).toLocaleString()}</td>
                      <td>
                        <a
                          href={`${BASE_URL}/files/${row.Link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="file-link"
                        >
                          {row.Link}
                        </a>
                      </td>
                      <td>
                        <Trash2
                          size={16}
                          className="delete-icon"
                          onClick={() => handleDelete(row.Id, row.Link)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-records">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Upload News/Event/Marquee</h3>
              <X size={18} onClick={closeModal} className="close-icon" />
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <label htmlFor="title"><b>Title</b></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter Title"
                required
                className="form-input"
              />

              <label htmlFor="type"><b>Type</b></label>
              <select
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                className="form-select"
              >
                <option value="News">News</option>
                <option value="Events">Events</option>
                <option value="Marquee">Marquee</option>
              </select>

              {/* START: Changes for custom file input */}
              <label htmlFor="file-upload" className="custom-file-upload-label">
                <b>Select a file</b>
                <input
                  type="file"
                  id="file-upload" // Link this ID to the label's htmlFor
                  name="file"
                  onChange={handleFormChange}
                  className="hidden-file-input" // This class will hide the native input
                />
                <span className="file-upload-button">Choose File</span> {/* This will be our visible button */}
                <span className="file-name-display">
                  {formData.file ? formData.file.name : "No file chosen"}
                </span>
              </label>
              {/* END: Changes for custom file input */}

              <div className="modal-actions">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNews;