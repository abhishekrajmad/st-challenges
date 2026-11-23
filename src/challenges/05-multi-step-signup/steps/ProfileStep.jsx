function ProfileStep({ data, onChange, errors }) {
  return (
    <div>
      <h2>Profile Details</h2>

      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={data.fullName || ""}
          onChange={onChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={data.phone || ""}
          onChange={onChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="city">City</label>
        <select
          id="city"
          name="city"
          value={data.city || ""}
          onChange={onChange}
        >
          <option value="">Select a city</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
        </select>
        {errors.city && <p className="error">{errors.city}</p>}
      </div>
    </div>
  );
}

export default ProfileStep;
