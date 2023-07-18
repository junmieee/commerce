import Carousel from 'nuka-carousel'

const AdSlider = () => {
  const adImages = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
  ]

  return (
    <Carousel>
      {adImages.map((image, index) => (
        <img key={index} src={image} alt={`Ad ${index + 1}`} />
      ))}
    </Carousel>
  )
}

export default AdSlider
