import { useAppSelector } from '../../hooks/redux';
import ScheduleModal from '../ScheduleModal/ScheduleModal';

function AboutUsPage() {
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);

  return (
    <div
      className={`bg-bgff relative mb-20 ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } `}
    >
      <ScheduleModal />
      <div className="min-h-screen bg-bgff py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-thirdff mb-8">
            About Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <img
                src="/about.jpg"
                alt="About Us"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <article className="md:order-first">
              <h2 className="text-2xl font-semibold text-thirdff mb-4">
                Our Story
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus justo a orci dignissim, vel blandit dui auctor. Sed ac
                fringilla ex. Donec interdum, nisl vitae ultrices laoreet, nulla
                eros volutpat turpis, quis congue sapien neque a felis. Nunc nec
                ante quis nisi luctus viverra vel nec metus.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Proin vel augue id nunc tincidunt volutpat. Curabitur tristique
                nisi et ante posuere, nec vestibulum justo laoreet. Integer vel
                eros et purus gravida vulputate. Nunc at lacus eget odio
                fermentum bibendum vel vitae nulla.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Fusce malesuada, urna ac fermentum euismod, justo elit luctus
                libero, ac auctor tellus erat a eros. Nullam in ex urna. Vivamus
                faucibus ultrices consectetur.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus justo a orci dignissim, vel blandit dui auctor. Sed ac
                fringilla ex. Donec interdum, nisl vitae ultrices laoreet, nulla
                eros volutpat turpis, quis congue sapien neque a felis. Nunc nec
                ante quis nisi luctus viverra vel nec metus.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Proin vel augue id nunc tincidunt volutpat. Curabitur tristique
                nisi et ante posuere, nec vestibulum justo laoreet. Integer vel
                eros et purus gravida vulputate. Nunc at lacus eget odio
                fermentum bibendum vel vitae nulla.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus justo a orci dignissim, vel blandit dui auctor. Sed ac
                fringilla ex. Donec interdum, nisl vitae ultrices laoreet, nulla
                eros volutpat turpis, quis congue sapien neque a felis. Nunc nec
                ante quis nisi luctus viverra vel nec metus.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Proin vel augue id nunc tincidunt volutpat. Curabitur tristique
                nisi et ante posuere, nec vestibulum justo laoreet. Integer vel
                eros et purus gravida vulputate. Nunc at lacus eget odio
                fermentum bibendum vel vitae nulla.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
