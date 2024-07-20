import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Footer from '../components/footer';

const Container = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  position: relative;
`;

const Section = styled.div`
  margin-bottom: 60px; /* Increased margin to accommodate the navigation dots */
`;

const Heading = styled.h1`
  margin-top: 20px;
  font-size: 36px;
`;

const ImageContainer = styled.div`
  display: flex;
  overflow-x: hidden; /* Hide horizontal scroll bar */
  scroll-behavior: smooth; /* Smooth scrolling */
  padding: 20px;
  position: relative;
  white-space: nowrap; /* Prevent line breaks */
`;

const ImageBox = styled.div`
  display: inline-block;
  margin-right: 20px;
  img {
    border-radius: 10px;
    width: 425px;
    height: 550px;
  }
`;

const NavigationDots = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#fff' : '#888')};
  cursor: pointer;
`;

const Dashboard = () => {
    const location = useLocation();
    const { data } = location.state || { data: [] };

    // Filter data based on prompt
    const photographyImages = data.filter(item => item.prompt === 'Photography');
    const learningImages = data.filter(item => item.prompt === 'Learning');
    console.log('photographyImages', photographyImages);
    console.log('learningImages', learningImages);

    // Refs for scrolling
    const photoRef = useRef(null);
    const learnRef = useRef(null);

    // State to manage active dot
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [activeLearnIndex, setActiveLearnIndex] = useState(0);

    // Update active dot based on scroll position
    const updateActiveDot = (sectionRef, setActiveIndex) => {
        const container = sectionRef.current;
        if (container) {
            const containerWidth = container.clientWidth;
            const scrollLeft = container.scrollLeft;
            const newIndex = Math.round(scrollLeft / containerWidth);
            setActiveIndex(newIndex);
        }
    };

    // Handle dot click
    const handleDotClick = (sectionRef, index, setActiveIndex) => {
        if (sectionRef.current) {
            const containerWidth = sectionRef.current.clientWidth;
            sectionRef.current.scrollTo({
                left: index * containerWidth,
                behavior: 'smooth',
            });
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            updateActiveDot(photoRef, setActivePhotoIndex);
            updateActiveDot(learnRef, setActiveLearnIndex);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Container>
            {/* Photography Section */}
            <Section>
                <Heading>Photography</Heading>
                <ImageContainer ref={photoRef}>
                    {photographyImages.map((item) => (
                        <ImageBox key={item.id}>
                            <img src={item.image_url} alt={item.title} />
                        </ImageBox>
                    ))}
                </ImageContainer>
                <NavigationDots>
                    {Array.from({ length: Math.ceil(photographyImages.length / 3) }).map((_, index) => (
                        <Dot
                            key={index}
                            onClick={() => handleDotClick(photoRef, index, setActivePhotoIndex)}
                            active={index === activePhotoIndex}
                        />
                    ))}
                </NavigationDots>
            </Section>

            {/* Learning Section */}
            <Section>
                <Heading>Learning</Heading>
                <ImageContainer ref={learnRef}>
                    {learningImages.map((item) => (
                        <ImageBox key={item.id}>
                            <img src={item.image_url} alt={item.title} />
                        </ImageBox>
                    ))}
                </ImageContainer>
                <NavigationDots>
                    {Array.from({ length: Math.ceil(learningImages.length / 3) }).map((_, index) => (
                        <Dot
                            key={index}
                            onClick={() => handleDotClick(learnRef, index, setActiveLearnIndex)}
                            active={index === activeLearnIndex}
                        />
                    ))}
                </NavigationDots>
            </Section>
            <Footer />

        </Container>
    );
};

export default Dashboard;
