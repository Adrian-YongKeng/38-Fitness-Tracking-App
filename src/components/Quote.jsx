import { useState } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import "./Quote.css";

const imageData = [
  {
    imageSrc: 'https://miro.medium.com/v2/resize:fit:1071/1*WNr4o3XKVcb556Al3beWAQ.jpeg',
    subtitle: 'Arnold Schwarzenegger',
    quote: "Your body is a reflection of your lifestyle."
  },
  {
    imageSrc: './src/therock.jpg',
    subtitle: 'Dwayne "The Rock" Johnson'
    , quote: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come."
  },
  {
    imageSrc: 'https://cdn.britannica.com/41/243941-050-9D8F156E/boxer-Cassius-Clay-May-17-1962-Bronx-New-York-Muhammad-Ali.jpg',
    subtitle: 'Muhammad Ali',
    quote: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.",
  },
  {
    imageSrc: 'https://i.ndtvimg.com/i/2017-03/rowan-atkinson_640x480_71490079191.jpg?ver-20231016.06',
    subtitle: 'Mr. Bean (Rowan Atkinson)',
    quote: "Life is about enjoying yourself, making something, being creative."
  },
  {
    imageSrc: 'https://cdn.vanguardngr.com/wp-content/uploads/2023/07/bruce-lee.jpeg',
    subtitle: 'Bruce Lee',
    quote: "Do not pray for an easy life; pray for the strength to endure a difficult one."
  },
  {
    imageSrc: './src/miketyson.jpg',
    subtitle: 'Mike Tyson',
    quote: "The more I train, the more I realize I have more speed in me.",
  },
];

export default function Quote() {

  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + itemsPerPage);
  };
  const handlePrevious = () => {
    setStartIndex(startIndex - itemsPerPage);
  };

  const showLeftArrow = startIndex > 0;
  const showRightArrow = startIndex + itemsPerPage < imageData.length;
  const visibleImages = imageData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Row className='mt-5'>
        <Col xs={1} className="text-center">
          {showLeftArrow && (
            <Button onClick={handlePrevious} style={{ border: 'none', padding: 0, background: 'none' }}>
              <i className="bi bi-arrow-left-circle" style={{ fontSize: '24px', color: 'darkgrey' }}></i>
            </Button>
          )}
        </Col>

        {/* Map and display visible images */}
        {visibleImages.map((item, index) => (
          <Col key={index} className="text-center">
            <div className="work">
              <div className="image-container">
                <Image src={item.imageSrc} style={{ height: "200px", width: "300px" }} />
                <div className="layer">
                  <h3>{item.subtitle}</h3>
                  <p>{item.quote}</p>
                </div>
              </div>
            </div>
          </Col>
        ))}

        <Col xs={1} className="text-center">
          {showRightArrow && (
            <Button onClick={handleNext} style={{ border: 'none', padding: 0, background: 'none' }}>
              <i className="bi bi-arrow-right-circle" style={{ fontSize: '24px', color: 'darkgrey' }}></i>
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}
