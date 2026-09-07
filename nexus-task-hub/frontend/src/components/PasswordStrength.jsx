import React, { useState, useEffect } from 'react';

const PasswordStrength = ({ password, onValidityChange }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('Enter password');

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const calculateStrength = (pwd) => {
    let score = 0;
    
    // Criteria
    const hasNumber = /\d/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const isLongEnough = pwd.length >= 8;

    if (isLongEnough) score += 1;
    if (hasNumber && hasUpper) score += 1;
    if (hasSpecial) score += 1;

    setStrength(score);

    // Communicate validity to parent form
    const isValid = isLongEnough && hasNumber && hasUpper && hasSpecial;
    if (onValidityChange) {
      onValidityChange(isValid);
    }

    if (pwd.length === 0) {
      setFeedback('Enter password');
      setStrength(0);
    } else if (score === 0) {
      setFeedback('Weak: Need 8+ chars');
    } else if (score === 1) {
      setFeedback('Weak: Add uppercase & number');
    } else if (score === 2) {
      setFeedback('Fair: Add special character');
    } else if (score === 3) {
      setFeedback('Strong: Matrix Secure');
    }
  };

  const getStrengthClass = () => {
    if (strength === 1) return 'strength-weak';
    if (strength === 2) return 'strength-fair';
    if (strength === 3) return 'strength-strong matrix-glow';
    return '';
  };

  return (
    <div>
      <div className="strength-meter">
        <div className={`strength-fill ${getStrengthClass()}`}></div>
      </div>
      <div className={`strength-text ${strength === 3 ? 'matrix-glow' : ''}`}>
        {feedback}
      </div>
    </div>
  );
};

export default PasswordStrength;
