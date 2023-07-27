interface HomeTitleProps {
  content: string;
}

function HomeTitle({ content }: HomeTitleProps) {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold text-center sm:text-center md:text-center text-thirdff mt-20 mb-10">
      {content}
    </h2>
  );
}

export default HomeTitle;
