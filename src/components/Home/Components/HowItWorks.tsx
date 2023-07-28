interface HowItWorksProps {
  imageHome: string;
  content: string;
}

function HowItWorks({ imageHome, content }: HowItWorksProps) {
  return (
    <div className="flex flex-col items-center space-around mt-20">
      <img
        src={imageHome}
        alt="image2"
        className="rounded-sm w-20 h-20 object-cover"
      />
      <div className="m-6 text-center sm:text-center md:text-center leading-loos max-w-md text-gray-500">
        {content}
      </div>
    </div>
  );
}

export default HowItWorks;
