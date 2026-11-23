import { useState } from "react";
import AccountStep from "./steps/AccountStep";
import ProfileStep from "./steps/ProfileStep";
import ReviewStep from "./steps/ReviewStep";
import { validate } from "./validate";
import "./SignupWizard.css";

function SignupWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const validationErrors = validate(currentStep, formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setErrors({});
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleEdit = (step) => {
    setCurrentStep(step);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final signup data:", formData);
    setSubmitted(true);
  };

  const handleStartOver = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
      city: "",
    });

    setErrors({});
    setCurrentStep(1);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="signup-wizard">
        <h2>Signup Successful!</h2>
        <p>Your account has been created successfully.</p>

        <div className="success-actions">
          <button
            type="button"
            className="btn btn-next"
            onClick={handleStartOver}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-wizard">
      <p>Step {currentStep} of 3</p>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <AccountStep
            data={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <ProfileStep
            data={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <ReviewStep data={formData} onEdit={handleEdit} />
        )}

        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" className="btn btn-back" onClick={handleBack}>
              Back
            </button>
          )}

          {currentStep < 3 && (
            <button type="button" className="btn btn-next" onClick={handleNext}>
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignupWizard;
