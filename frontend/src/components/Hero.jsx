import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5 row'>
      <Container className='d-flex justify-content-center'>
      <div id='homeSectionOne' className=' justify-content-center'>
        <div id='blogOne'>
        <span id='bestWay'>Best way to learn from anywhere</span>
        <h1>Learn on your schedule from any device</h1>
        <p>No need to switch between multiple apps for video sessions.Real-time discussions and lectures with educators.Visualizers for pathfinding and sorting algorithms. User-friendly interface: Intuitive and easy to navigate.</p>
        <h2>Start Now <span className='arrow'>&rarr;</span></h2>
        </div>
      </div>
        <Card className='p-5 d-flex flex-column align-items-center bg-transparent' id='regCard'>
          <h1 className='text-center mb-4'>Classroom Plus Authentication</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className='d-flex'>
          <LinkContainer to='/login'>
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
            </LinkContainer>
        <LinkContainer to='/register'>
            <Button variant='secondary'>
              Register
            </Button>
        </LinkContainer>
          </div>
        </Card>
        
      </Container>
      <Container className='d-flex'>
        <div className=' py-5 row'>
        <div id='secondPostOne'>
        <div id='aboveimg'></div>
          <div id='green'></div>
          <div id='imgContainer'>
          <img src='/assets/images/blogPost.jpg'  alt='myImage'/>
          </div>
        </div>
        
        </div>
        <div id='secondPostTwo'>
        <span id='about'>About US</span>
        <h2>Welcome to <span id='halfLogo'>Classroom</span><span id='sHalfLogo'> Plus</span></h2>
        <p>Our web-based application aims to revolutionize <br></br>online learning by providing a comprehensive<br></br> platform for students and educators.</p>
        <ul class="point-list">
          <div id='pointContainer'>
            <li className="point">
              <span className="tick"></span>
            </li><span id='pointText'>User-friendly interface: Intuitive and easy to navigate.</span>
          </div>
          <div id='pointContainer'>
            <li className="point">
              <span className="tick"></span>
            </li><span id='pointText'>Enhanced engagement: Promotes interactive learning and idea sharing.</span>
          </div>
         
          
        </ul>

        </div>
      </Container>
      
      <Container> 
      <div id='benefitsH1'><h1>Benefits of Our Web Application</h1></div> 
      <div id='benefitsSection'>
        
          <div id='benefits'>
          <ul class="point-list" id='benefitsList'>
          <div id='pointContainer'>
            <li className="point">
              <span className="tick"></span>
            </li><span id='benefitsText'>Seamless transition: No need to switch between multiple apps for video sessions.</span>
          </div>
          <div id='pointContainer'>
            <li className="point">
              <span className="tick"></span>
            </li><span id='benefitsText'>Efficient learning: Real-time discussions and lectures with educators.</span>
          </div>
          <div id='pointContainer'>
            <li className="point">
              <span className="tick"></span>
            </li><span id='benefitsText'>Algorithm comprehension: Visualizers for pathfinding and sorting algorithms.</span>
          </div>
          <div id='pointContainer'>
            <li className="point">
              <span className="tick"></span>
            </li><span id='benefitsText'>User-friendly interface: Intuitive and easy to navigate.</span>
          </div>
          <div id='pointContainer'>
            <li className="point">
              <span className="tick"></span>
            </li><span id='benefitsText'>Enhanced engagement: Promotes interactive learning and idea sharing.</span>
          </div>
        </ul>
          </div>
        </div>
      </Container>
      <Container>
        <div id='aboutUs'>
        <div id='benefitsH1'><h1>About Us</h1></div>
        <div id='detail'>
          <p>Our web-based application aims to revolutionize online learning by providing a comprehensive platform for students and educators. We understand the challenges faced by students when transitioning between different apps and the difficulties in grasping complex algorithms. Our goal is to streamline the learning experience by integrating video conferencing and algorithm visualizers into one cohesive space.</p>
          <p>With our user-friendly interface and advanced features, we strive to enhance the efficiency and effectiveness of online education. Students can easily connect with educators, engage in real-time discussions, and gain a better understanding of challenging algorithms through interactive visualizations. Our platform is designed to make online learning more engaging, interactive, and productive.</p>  
        </div>
        </div>
        
      </Container>
      
      <span id='endingText'>© 2023 Your Learning Platform Classroom Plus. All rights reserved.</span>
    </div>
  );
};

export default Hero;
