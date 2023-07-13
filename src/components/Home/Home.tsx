import HeadHome from './HeadHome';
import MainHome from './MainHome';
import FootHome from './FootHome';

function Home() {
  return (
    <div className="bg-neutral-50 relative">
      <HeadHome />
      <MainHome />
      <FootHome />
    </div>
  );
}

export default Home;
