import React, {useEffect, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {useAuth} from '../states/userState';
import nicknames from '../assets/nicknames';
import LineGraph from '../components/myLineGraph'
import HorizontalBarChart from "../components/BarGraph";
import DoughnutChart from "../components/DoughnutChart";
import Modal from "../components/Modal";
import DetailItem from "../components/DetailItem";
import ProfileBadges from "../components/ProfileBadges";
const Profile = () => {
  const {
    logout,
    user,
    usersCollection,
    profilePic,
    uploadProfilePic,
    getCatScores,
    categoryScores,
    hasCatScore,
    name,
    scores,
    setScores,
    setStringDate,
    stringDate,
    badges
  } = useAuth();
  const redirect = useHistory();

  const [school, setSchool] = useState('');
  const [last, setLast] = useState('');
  const [avg, setAvg] = useState(0);
  const [cuteName, setCuteName] = useState('');
  const [data, setData] = useState([]);
  const [toggleBarGraph, setToggleBarGraph] = useState(false);
  const [toggleLineGraph, setToggleLineGraph] = useState(true);
  const [togglePieChart, setTogglePieChart] = useState(false);
  const fileUpload = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredArr, setFilteredArr] = useState([])
  const [style, setStyle] = useState({display: 'none'});

  let newArr = []
  let arr = [];

  function handleLogOut() {
    logout();
    redirect.push('/');
  }

  useEffect(() => {

    usersCollection
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.data().scores) {
          let arr = doc.data().scores.reverse();
          newArr = doc.data().scores.reverse();
          setScores(arr);

          for (let i = 0; i < newArr.length; i++) {
            newArr[i].createdAt = (month[newArr[i].createdAt.toDate().getMonth()] +
              '-' +
              newArr[i].createdAt.toDate().getDate() +
              '-' +
              newArr[i].createdAt.toDate().getFullYear());
          }
          setStringDate(newArr)
          setLast(
            month[arr[0].createdAt.toDate().getMonth()] +
            ' ' +
            arr[0].createdAt.toDate().getDate() +
            ', ' +
            arr[0].createdAt.toDate().getFullYear()
          );
          var sum = 0;
          for (var i = 0; i < arr.length; i++) {
            sum = sum + arr[i].score;
          }
          const const_avg = (sum / arr.length).toFixed(0);
          setAvg((sum / arr.length).toFixed(0))

          nicknames.forEach((nickname, index) => {
            if (const_avg >= nickname.bottom && const_avg <= nickname.top) {
              setCuteName(nicknames[index].name);
            }
          });
          getUserAverage(arr);

        } else {
          setScores(undefined);
          setLast('N/A');
        }
        getCatScores()
        setSchool(doc.data().school);
      });
  }, []);

  const getUserAverage = (userInfo) => {
    //Graph average logic
    let graphArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
    for (let i = 0; i < graphArr.length; i++) {
      let counter = 0;
      userInfo.forEach(index => {
        if (index.createdAt.toDate().getMonth() == i) {
          graphArr[i] += index.score;
          counter++;
        }
      })
      graphArr[i] = Math.round(graphArr[i] / counter);
    }
    setData(graphArr);
  }

  const handleUpload = () => {
    fileUpload.current.click();
  }

  const handleBarGraphToggle = () => {
    setToggleBarGraph(true)
    setToggleLineGraph(false)
    setTogglePieChart(false)
  }

  const handleLineGraphToggle = () => {
    setToggleLineGraph(true)
    setToggleBarGraph(false)
    setTogglePieChart(false)
  }

  const handlePieChartToggle = () => {
    setTogglePieChart(true)
    setToggleBarGraph(false)
    setToggleLineGraph(false)
  }

  const passDate = (month, day, year) => {
    setShowModal(true)
    let date = month + '-' + day + '-' + year;
    arr = stringDate.filter(item => item.createdAt === (date))
    setFilteredArr(arr)
    console.log(arr)
  }

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const htmlOfScores =
    scores !== null && scores !== undefined
      ? scores.slice(0, 8).map((score, i) => {
        return (
          <tr key={i}
              onMouseEnter={e => {
                setStyle({display: 'block'});
              }}
              onMouseLeave={e => {
                setStyle({display: 'none'})
              }}>
            <td>{scores.length - i}</td>
            <td>
              {month[score.createdAt.toDate().getMonth()]}{' '}
              {score.createdAt.toDate().getDate()},{' '}
              {score.createdAt.toDate().getFullYear()}
            </td>
            <td>{score.score}</td>
            <td >
              <button
                className='btn btn-primary'
                style={style}
                onClick={() => {
                  passDate(month[score.createdAt.toDate().getMonth()], score.createdAt.toDate().getDate(), score.createdAt.toDate().getFullYear())
                }}>
                Detailed Info
              </button>
            </td>
          </tr>
        );
      })
      : '';
  const toggleModal = () => setShowModal(!showModal);
  return (
    <div className='container mw-100'>
      <div className='row profile-container'>
        {(showModal) && (
          <Modal isOpen={showModal} toggle={toggleModal} ariaHideApp={false}>
            <h1>Detailed Info</h1>
            <br/>
            <DetailItem
              scores={filteredArr}
              toggle={toggleModal}
            />
          </Modal>)}
        <div className='col m-3 profile-user-col'>
          <Card className='profile-card' border='primary'>
            <div className='profile-imagecontainer'>
              <br/>
              <Image
                className='profile-image'
                src={profilePic}
                roundedCircle
              />
            </div>
            <input
              type='file'
              className='mt-2 mb-3 text-primary'
              ref={fileUpload}
              onChange={uploadProfilePic}
              style={{opacity: "0", width: '1px', height: '1px'}}
            />
            <button
              type='button'
              className='btn btn-primary py-2 px-5 mb-3'
              onClick={handleUpload}
            >
              Upload Picture
            </button>
            <h3 className='mt-2 mb-3 text-primary'>{name}</h3>
            <h5 className='mt-2 mb-3 text-primary'>Current Level: {cuteName}</h5>
            <button
              type='button'
              className='btn btn-primary py-2 px-5 mb-3'
              onClick={handleLogOut}
            >
              Log Out
            </button>
            <Card.Text className='profile-card-text'>
              <strong>Email:</strong> {user.email}
              <br/>
              <strong>School:</strong> {school} <br/>
            </Card.Text>
            <Card.Text className='profile-card-text'>
              <strong>Last Survey Taken:</strong> {last}
              <br/>
              <strong>Total Survey's Taken:</strong>{' '}
              {scores ? scores.length : 0}
              <br/>
              <strong>Average Score:</strong> {avg} points
              <br/>
            </Card.Text>
            <div className='profile-center-container'>
              <Link
                to='/questionnaire'
                className='btn btn-primary py-2 px-5 mb-3'
              >
                Take Survey
              </Link>
            </div>
            <br/>
          </Card>
        </div>
        <div className='col m-3 profile-table-col'>
          <div className='h3-align'>
            {hasCatScore && scores !== undefined && <h3 className='text-primary'>Charts</h3>}
            <br/>
            {scores !== undefined && (<button
              type='button'
              className='btn btn-primary py-1 px-3 mb-2'
              onClick={handleLineGraphToggle}
            >
              Line Chart
            </button>)}
            <div className="divider"/>
            {hasCatScore && <button
              type='button'
              className='btn btn-primary py-1 px-3 mb-2'
              onClick={handleBarGraphToggle}
            >
              Category Scores
            </button>}
            <div className="divider"/>
            {hasCatScore && <button
              type='button'
              className='btn btn-primary py-1 px-3 mb-2'
              onClick={handlePieChartToggle}
            >
              Doughnut Chart
            </button>}
            <br/>
            <br/>
          </div>
          {toggleLineGraph && scores !== undefined && <LineGraph data={data}/>}
          <br/>
          {toggleLineGraph && scores === undefined && (<Card className='profile-card' border='primary'>
            <br/>
            <h3 className=' h3-align'>Take a survey to get more details on how you are doing!</h3>
            <br/>
          </Card>)}

          {toggleBarGraph && (<Card className='profile-card' border='primary'>
            <br/>
            {toggleBarGraph && hasCatScore && <HorizontalBarChart catScores={categoryScores}/>}
            {toggleBarGraph && !hasCatScore &&
            <h3 className=' h3-align'>Take a survey to get more details on how you are doing!</h3>}
            <br/>
          </Card>)}

          {togglePieChart && (<Card className='profile-card' border='primary'>
            <br/>
            {togglePieChart && hasCatScore && <DoughnutChart catScores={categoryScores}/>}

            {togglePieChart && !hasCatScore &&
            (<div>
              <h3 className=' h3-align'>Take a survey to get more details on how you are doing!</h3>
            </div>)}
            <br/>
          </Card>)}
          <br/>
          <br/>
          <Card className='profile-card' border='primary'>
            <br/>
            <h3 className='mb-0 text-primary'>Survey History</h3>
            {scores && (
              <Table striped borderless hover className='mb-0'>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Score</th>
                </tr>
                </thead>
                <tbody>{htmlOfScores}</tbody>
              </Table>
            )}
            {scores === undefined && <h1>No scores</h1>}
            <br/>
          </Card>
          <br/>
          <br/>
          <br/>
        </div>
        <ProfileBadges badges={badges}/>
      </div>
    </div>
  );
};

export default Profile;