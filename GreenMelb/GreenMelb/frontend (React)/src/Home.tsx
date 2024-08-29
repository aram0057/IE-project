import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";


const GreenMelbLandingPage: React.FC = () => {
    const navigate = useNavigate();

    const navigateToPage = (path: string) => {
        navigate(path);
    };

    return (
        <div className="landing-page">
          <header/>
          <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Green Melb</h1>
                    <p>Your partner in sustainable waste management for a cleaner Melbourne.</p>
                    <button onClick={() => navigateToPage('/get-started')}>
                        Get Started
                    </button>
                </div>
      
            </section>

            <section id="features" className="features-section">
                <h2>How We Can Help</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Identify Your Waste</h3>
                        <p>Not sure what goes where? Start by identifying the type of waste you have.</p>
                        <button onClick={() => navigateToPage('/identifyWaste')}>
                            Learn More
                        </button>
                    </div>
                    <div className="feature-card">
                        <h3>Find a Local Recycling Center</h3>
                        <p>Locate the nearest recycling center to dispose of your waste responsibly.</p>
                        <button onClick={() => navigateToPage('/MapPage')}>
                            Learn More
                        </button>
                    </div>
                    <div className="feature-card">
                        <h3>Learn About Organic Waste</h3>
                        <p>Discover what you can do with organic waste to help reduce landfill.</p>
                        <button onClick={() => navigateToPage('/OrganicWaste')}>
                            Learn More
                        </button>
                    </div>
                    <div className="feature-card">
                        <h3>Earn Achievements</h3>
                        <p>Track your progress and earn badges as you improve your waste management habits.</p>
                        <button onClick={() => navigateToPage('/achievements')}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <section id="about" className="about-section">
                <h2>About Green Melb</h2>
                <p>
                    At Green Melb, our mission is to empower the people of Melbourne to manage waste effectively and sustainably. Whether you're looking to reduce, reuse, or recycle, we're here to guide you every step of the way.
                </p>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Green Melb. All rights reserved.</p>
                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </nav>
            </footer>
        </div>
    );
};

export default GreenMelbLandingPage;
