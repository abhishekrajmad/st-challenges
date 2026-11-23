function AccountStep({ data, onChange, errors }) {
  return (
    <div>
      <h2>Account Details</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={data.email || ""}
          onChange={onChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={data.password || ""}
          onChange={onChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={data.confirmPassword || ""}
          onChange={onChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
}

export default AccountStep;
