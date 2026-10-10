'use client';

import React from 'react';
import Link from 'next/link';

export default function PreferencesPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#e0e7ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7h-9"></path>
            <path d="M14 17H5"></path>
            <circle cx="17" cy="17" r="3"></circle>
            <circle cx="7" cy="7" r="3"></circle>
          </svg>
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>
          Welcome Aboard!
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Since this is your first time, let's set up your travel preferences so we can recommend the best flights and destinations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
          <button style={{
            padding: '1.2rem',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#4b5563',
            transition: 'all 0.2s'
          }}>
            🌴 Beach Getaway
          </button>
          <button style={{
            padding: '1.2rem',
            border: '2px solid #6366f1',
            backgroundColor: '#eef2ff',
            borderRadius: '16px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#6366f1',
            transition: 'all 0.2s'
          }}>
            🏔️ Mountain Trek
          </button>
          <button style={{
            padding: '1.2rem',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#4b5563',
            transition: 'all 0.2s'
          }}>
            🏙️ City Explorer
          </button>
          <button style={{
            padding: '1.2rem',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#4b5563',
            transition: 'all 0.2s'
          }}>
            🍲 Foodie Tour
          </button>
        </div>

        <Link href="/home">
          <button style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(99, 102, 241, 0.2)'
          }}>
            Save & Continue to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
