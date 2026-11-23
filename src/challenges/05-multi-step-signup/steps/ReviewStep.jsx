function ReviewStep({ data, onEdit }) {
  return (
    <div>
      <h2>Review Your Details</h2>

      <div>
        <h3>Account</h3>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Password:</strong> ********
        </p>
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => onEdit(1)}
        >
          Edit
        </button>
      </div>

      <div>
        <h3>Profile</h3>
        <p>
          <strong>Full Name:</strong> {data.fullName}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
        <p>
          <strong>City:</strong> {data.city}
        </p>
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => onEdit(2)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default ReviewStep;
