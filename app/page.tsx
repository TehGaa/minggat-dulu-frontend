'use client';

import React, { useState } from 'react';
import { Navbar } from '@/module/Navbar';

export default function Home() {
	const [activeTab, setActiveTab] = useState('Flights');

	return (
		<div className="home-container">
			{/* Dynamic Sticky Navbar */}
			<Navbar
				variant="auto"
				tabs={['Flights', 'Trains', 'Bus']}
				activeTab={activeTab}
				onTabChange={setActiveTab}
			/>

			{/* Hero Section with Search Widget */}
			<section className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">Where are you traveling next?</h1>

					<div className="search-widget">
						<div className="search-row">
							{/* Location Inputs (Left Side) */}
							<div className="search-group location-group">
								<div className="search-field">
									<label>From {activeTab === 'Flights' ? 'Airport' : activeTab === 'Trains' ? 'Station' : 'City'}</label>
									<input type="text" placeholder="Origin" />
								</div>
								<div className="search-divider">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M5 12h14"></path>
										<path d="m12 5 7 7-7 7"></path>
									</svg>
								</div>
								<div className="search-field">
									<label>To {activeTab === 'Flights' ? 'Airport' : activeTab === 'Trains' ? 'Station' : 'City'}</label>
									<input type="text" placeholder="Destination" />
								</div>
							</div>

							{/* Date Inputs (Right Side) */}
							<div className="search-group date-group">
								<div className="search-field">
									<label>Departure</label>
									<input type="date" />
								</div>
								<div className="search-divider">|</div>
								<div className="search-field">
									<label>Return</label>
									<input type="date" />
								</div>
							</div>

							{/* Search Button (Most Right Side) */}
							<button className="search-submit-btn">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
									<circle cx="11" cy="11" r="8"></circle>
									<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content Area */}
			<main className="home-content">
				<h2>Explore popular destinations</h2>

				{/* Placeholder content to demonstrate scroll and sticky navbar */}
				<div style={{ marginTop: '2rem', height: '100vh', backgroundColor: '#F9F7F4', borderRadius: '24px', display: 'flex', justifyContent: 'center', paddingTop: '4rem', border: '1px solid #e5e7eb' }}>
					<p style={{ color: '#1E3F40', fontWeight: 600, fontSize: '1.5rem' }}>Search results for {activeTab} will appear here...</p>
				</div>
			</main>
		</div>
	);
}
