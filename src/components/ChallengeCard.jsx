import { Link } from "react-router-dom";

function ChallengeCard({ challenge }) {
  return (
    <Link to={challenge.path} className="challenge-card-link">
      <div className="challenge-card">
        <div className="challenge-card-top">
          <span>{challenge.category}</span>
          <span>{challenge.level}</span>
        </div>

        <h3>
          {challenge.id}. {challenge.title}
        </h3>

        <p>{challenge.description}</p>

        {/* <div className="challenge-card-footer">
          <span>{challenge.duration}</span>
          <span>{challenge.status}</span>
        </div> */}
      </div>
    </Link>
  );
}

export default ChallengeCard;
