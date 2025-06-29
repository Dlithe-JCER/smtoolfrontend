import Navbar from '../Navbar/Navbar';
import background from '../../assets/image.png';

function LandingPage1() {
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                marginTop: '60px'
            }}
        >
            <Navbar />
            {/* You can add more content here */}
        </div>
    );
}

export default LandingPage1;
