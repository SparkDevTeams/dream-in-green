import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {useAuth} from '../states/userState';
import successImg from '../images/success-image.svg';
import Confetti from "../components/Confetti";

const SuccessPage = () => {
  const {user, addScoreToDb, setTookQuizNotLoggedIn, tookQuizNotLoggedIn, notLoggedInTotal} = useAuth();
  const {score} = useParams();

  const quizNotLoggedIn = () => {
    setTookQuizNotLoggedIn(true)
  }
  const newUserQuizHandler = async () => {
    if (tookQuizNotLoggedIn) {
      try {
        await addScoreToDb(user.uid, notLoggedInTotal, new Date());
      } catch (e) {
        console.log(e);
      }
      setTookQuizNotLoggedIn(false)
    }
  }
  if(tookQuizNotLoggedIn){
    newUserQuizHandler()
  }
  return (
      <div className='container'>
        <Confetti/>
        <div className='success-hero'>
          <img
              src={successImg}
              className='success-img'
              alt='Woman jumping with cellphone in the background along a check mark'
          />
        </div>
        <div className='success-text'>
          <h1 className='text-primary'>YOU DID IT!</h1>
          <p>Thank you for taking the questionnaire!</p>
        </div>
        <div className='success-score-box'>
          <p>{score}/150</p>
        </div>
        {!user && (
            <div className='success-text'>
              <p className='font-weight-bold'>Please take a second to login or create an account to be able to
                track progress!</p>
              <Link
                  to='/questionnaire'
                  className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                  onClick={quizNotLoggedIn}
              >
                Log In
              </Link>
              <Link
                  to='/sign-up'
                  className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                  onClick={quizNotLoggedIn}
              >
                Sign Up
              </Link>
            </div>
        )}
        {user && <Link to='/profile' className='success-score-banner fancy-bg'>
          <p>View Your Progress</p>
        </Link>}
        <div className='tips-text'>
          <h4>Check out these tips and see how you can improve your score 📗</h4>
        </div>
        <Accordion className='pt-0 pb-0'>
          <Card className='accordion-section'>
            <Accordion.Toggle as={Card.Header} eventKey='0'>
              <h5>Energy Tips</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0' className='accordion-tips'>
              <Card.Body>
                <h6>🍃 Switch lights off!</h6>
                <p>
                  When leaving the room turn off the lights and unplug electronic
                  devices when they are not in use.
                </p>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey='0' className='accordion-tips'>
              <Card.Body>
                <h6>
                  🍃 Lower your thermostat in winter and raise it in summer.
                </h6>
                <p>
                  Use less air conditioning in the summer; instead opt for fans,
                  which require less electricity. And check out these other ways
                  to beat the heat without air conditioning.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className='accordion-section'>
            <Accordion.Toggle as={Card.Header} eventKey='1'>
              <h5>Water Tips</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1' className='accordion-tips'>
              <Card.Body>
                <h6>🍃 Take shorter showers</h6>
                <p>
                  A typical shower uses five to ten gallons of water a minute.
                  Limit your showers to the time it takes to soap up, wash down
                  and rise off.
                </p>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey='1' className='accordion-tips'>
              <Card.Body>
                <h6>🍃 Turn off the water while brushing your teeth</h6>
                <p>
                  Before brushing, wet your brush and fill a glass for rinsing
                  your mouth.{' '}
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className='accordion-section'>
            <Accordion.Toggle as={Card.Header} eventKey='2'>
              <h5>Waste Tips</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='2' className='accordion-tips'>
              <Card.Body>
                <h6>🍃 Reduce your food waste</h6>
                <p>
                  Plan your meals ahead of time, freeze the excess and reuse
                  leftovers.
                </p>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey='2' className='accordion-tips'>
              <Card.Body>
                <h6>🍃 Eat low on the food chain</h6>
                <p>
                  This means eating mostly fruits, veggies, grains, and beans.{' '}
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className='accordion-section'>
            <Accordion.Toggle as={Card.Header} eventKey='3'>
              <h5>Shopping Tips</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='3' className='accordion-tips'>
              <Card.Body>
                <h6>🍃 Reduce buying brand new clothes</h6>
                <p>
                  Thrifting is a great way to help the environment.
                  It helps reduce the amount of clothing that ends up in landfills.
                </p>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey='3' className='accordion-tips'>
              <Card.Body>
                <h6>🍃 Consider buying refurbished or recycled products</h6>
                <p>
                  This means you are getting a like-new product.
                  Which will reduce carbon emissions during production. {' '}
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
  );
};

export default SuccessPage;
