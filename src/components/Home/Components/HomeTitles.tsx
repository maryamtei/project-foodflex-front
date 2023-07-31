// Define the props interface for the HomeTitle component
interface HomeTitleProps {
  content: string; // The content of the title as a string
}

// HomeTitle component displays a styled title with the provided content
function HomeTitle({ content }: HomeTitleProps) {
  return (
    // Styled title with specific text formatting and spacing
    <h2 className="text-3xl sm:text-4xl font-bold text-center sm:text-center md:text-center text-titleff mt-20 mb-10">
      {content}
    </h2>
  );
}

// Export the HomeTitle component as the default export
export default HomeTitle;
