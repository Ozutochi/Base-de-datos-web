import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Decorative side shapes imitating the blue geometric pattern in reference */}
      <div className="bg-shape-left"></div>
      <div className="bg-shape-right"></div>

      <nav className="landing-nav">
        <div className="nav-logo">
          <Shield size={32} />
          <span>ACADEMIA</span>
        </div>
        <div style={{ width: 100 }}>{/* Placeholder to balance flex */}</div>
      </nav>

      <main className="hero-section">
        {/* Massive Text Background */}
        <h1 className="hero-title">FÚTBOL</h1>
        
        {/* We will use a reliable high-res transparent PNG of a soccer player kicking a ball */}
        <img 
          src="https://pngimg.com/uploads/football_player/football_player_PNG41.png" 
          alt="Jugador de Fútbol Hero" 
          className="hero-player-image" 
        />

        {/* CTA Button overlapping the player slightly */}
        <button className="cta-button" onClick={() => navigate('/login')}>
          INGRESAR AL SISTEMA
        </button>
      </main>
    </div>
  );
};

export default LandingPage;
