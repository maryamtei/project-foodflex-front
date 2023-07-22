interface HowItWorksProps {
  imageHome: string;
  content: string;
}

function HowItWorks({ imageHome, content }: HowItWorksProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={imageHome}
        alt="image2"
        className="mt-4 rounded-full w-24 h-24 object-cover"
      />
      <div className="mt-2 text-center sm:text-center md:text-center">
        {content}
      </div>
    </div>
  );
}

export default HowItWorks;
