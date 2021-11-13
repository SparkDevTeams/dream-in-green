import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import InformationRow from '../components/InformationRow';
import ContactUsForm from '../components/ContactUsForm';

import homeImgFir from '../images/girl-earth.svg';
import {useAuth} from "../states/userState";

const Home = () => {
  const {user,getCatScores} = useAuth();
  useEffect(() => {
    getCatScores()
  },[])
  return (
    <div>
      <div className='background-color1'>
        <div className='container'>
          <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
            <div className='col-lg-6 text-center txt-md-left'>
              <div className='row mb-3'>
                <h1 className='display-4 font-weight-bold'>
                  Monitor your greenhouse emissions
                </h1>
              </div>
              {user && ( <Link
                  to='/questionnaire'
                  className='btn btn-primary my-2 my-lg-0 py-3 px-5'
              >
                Get Started
              </Link>)}


              {!user && <Link
                  to='/welcome-questionnaire'
                  className='btn btn-primary my-2 my-lg-0 py-3 px-5'
              >
                Take Your First Quiz*
              </Link>}
              {!user && <div className='font-weight-bold'>
                *Will have opportunity at end of quiz, to create an account or login, to be able to track progress
              </div>}
            </div>
            <div className='col-lg-6'>
              <div className='hero-img-right'>
                <img
                    src={homeImgFir}
                    className='fluid-img'
                    alt='Sitting on questionnaire'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container '>
          <InformationRow />
          <div>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
