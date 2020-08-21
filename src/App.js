import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa'
import api from 'services/api';

import './styles.css';

import Header from 'components/Header';

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório no Github`,
      url: 'https://github.com/guigawhata',
      techs: ['Laravel', 'Node.js', 'React.js', 'React Native']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const deleteRepository = await api.delete(`repositories/${id}`);

    if (deleteRepository) {
      const index = repositories.findIndex(repository => repository.id === id);

      repositories.splice(index, 1);

      setRepositories([...repositories]);
    }
  }

  return (
    <>
    <Header />
    <div className="repositories-cont">
      <div className="list-cont">
        <ul data-testid="repository-list">
          {repositories.map(repository => 

          <li key={repository.id}>
            <div className="info">
              <h3>{repository.title}</h3>

              <a href={repository.url} target="_blank" rel="noopener noreferrer">
                <FaGithub size={40}/>
              </a>
            </div>

            <div className="remove-cont">
              <button className="button-remove" onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </div>            
          </li>
                    
          )}          
        </ul>               
      </div>
      <button className="button-add" onClick={handleAddRepository}>Adicionar</button>
    </div>
    </>
  );
}

export default App;
