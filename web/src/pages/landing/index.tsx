import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/styles/global.css';
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import powerIcon from '../../assets/images/icons/start-button.svg';
import api from '../../services/api';

import './styles.css'

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const {total} = response.data
    
      setTotalConnections(total);
    })
  }, [])

  return(
    <div id="page-landing">
      <div id="page-landing-content" className="container">

        <div className="top-side">
          
            <div className="profile-shown">
              <img src="https://pbs.twimg.com/profile_images/1286357239259901952/PrUR0M72_400x400.jpg" alt="profile"/>
              <span> Samuel Rodigues </span> 
            </div>

            <div className="style-button">      
              <span>log-out</span>
              <button type="button">
                <img src={powerIcon} alt="log-out"/> 
              </button>
            </div>
          
        </div>

      
          <div className="logo-container">
            <img src={ logoImg } alt="Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>

          <img 
            src={ landingImg } 
            alt="plataforma de estudos" 
            className="hero-image" 
          />


        <footer className='bottom'>
          <div className="welcome">
            <span>Seja bem-vindo. 
                <p><strong>Oque deseja fazer?</strong></p>
            </span>
          </div>
          <div className="buttons-container">
            <Link to="/study" className="study" >
              <img src={ studyIcon } alt="estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes" >
              <img src={ giveClassesIcon } alt="estudar" />
              Dar Aula
            </Link>
          </div>

          <span className="total-conections">
            Total de {totalConnections} conexoes ja realizadas <img src={ purpleHeartIcon } alt="coracao roxo" />
          </span>
        </footer>
      </div> 

    </div>
    
  )
}                                                        

export default Landing;