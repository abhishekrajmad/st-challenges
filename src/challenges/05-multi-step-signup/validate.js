export function validate(step, data) {
  const errors = {};

  if (step === 1) {
    const email = (data.email || "").trim();
    const password = data.password || "";
    const confirmPassword = data.confirmPassword || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  if (step === 2) {
    const fullName = (data.fullName || "").trim();
    const phone = (data.phone || "").trim();
    const city = (data.city || "").trim();

    if (!fullName) {
      errors.fullName = "Full name is required.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (!city) {
      errors.city = "Please select a city.";
    }
  }

  return errors;
}

console.log(
  validate(1, {
    email: "user@example.com",
    password: "Pass123!",
    confirmPassword: "Pass123!",
  }),
);

console.log(
  validate(2, {
    fullName: "",
    phone: "1234",
    city: "",
  }),
);
