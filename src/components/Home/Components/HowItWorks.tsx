// Define the props interface for the HowItWorks component
interface HowItWorksProps {
  imageHome: string; // The URL of the image to be displayed
  content: string; // The content describing how it works
}

// HowItWorks component displays an image and corresponding content in a column layout
function HowItWorks({ imageHome, content }: HowItWorksProps) {
  return (
    // Flex container with items centered vertically and spaced around
    <div className="flex flex-col items-center space-around mt-20">
      {/* Display the provided image */}
      <img
        src={imageHome} // Use the URL provided as the image source
        alt="image2" // Alternative text for the image (accessible to screen readers)
        className="rounded-sm w-20 h-20 object-cover" // Styling for the image
      />
      <div className="m-6 text-center sm:text-center md:text-center leading-loos max-w-md text-gray-500">
        {content} {/* Display the provided content in a text block */}
      </div>
    </div>
  );
}

// Export the HowItWorks component as the default export
export default HowItWorks;
