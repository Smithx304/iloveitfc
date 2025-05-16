"use client";

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://iloveitf-backend.onrender.com/api/process', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      alert("Failed to process file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '2.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#111827'
        }}>iloveITF</h1>

        <p style={{
          color: '#6b7280',
          fontSize: '1.1rem',
          marginBottom: '2rem'
        }}>Upload your CSV to get the latest paperwork</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ marginBottom: '1.2rem', fontSize: '1rem' }}
          />

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              padding: '0.9rem 1.8rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Processing...' : 'Analyze Document'}
          </button>
        </div>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="Driver_Paperwork_Summary.xlsx"
            style={{
              display: 'block',
              marginTop: '1.8rem',
              color: '#2563eb',
              fontWeight: '500',
              fontSize: '1rem'
            }}
          >
            Download Result
          </a>
        )}
      </div>
    </main>
  );
}
