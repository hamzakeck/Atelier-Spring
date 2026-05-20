import React from 'react';

class Bienvenue extends React.Component {
  render() {
    const jumbotronStyle = {
      padding: '2rem 1rem',
      marginBottom: '2rem',
      backgroundColor: '#343a40',
      borderRadius: '.3rem',
      color: 'white'
    };

    return (
      <div style={jumbotronStyle}>
        <h1>Bienvenue au Magasin des Voitures</h1>
        <blockquote className="blockquote mb-0">
          <p>Le meilleur de nos voitures est exposé près de chez vous</p>
          <footer className="blockquote-footer text-muted">Master MIOLA</footer>
        </blockquote>
      </div>
    );
  }
}

export default Bienvenue;
