
import { challenges } from "../data/challenges";
import ChallengeCard from "../components/ChallengeCard";

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Daily Challenges</h1>
        {/* <p>
          A collection of React challenges I'm solving
          to improve my frontend development skills.
        </p> */}
      </header>

      <section className="challenges-section">
        <div className="section-heading">
          <h2>My Challenges</h2>
          <span>{challenges.length} Challenges</span>
        </div>

        <div className="challenges-grid">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
