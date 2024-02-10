import { useState, useRef } from "react";
import "./App.css";
import { FaEye } from "react-icons/fa";

const sendData = (formData) => {
  console.log(formData);
};

export const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatePassword, setRepeatePasword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [passwordMatchError, setPasswordMathcError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    sendData({ email, password, repeatePassword });
    resetState();
  };

  const resetState = () => {
    setEmail("");
    setPassword("");
    setRepeatePasword("");
    setShowPassword(false);
    setShowPassword2(false);
    setLengthError(false);
    setPasswordMathcError(false);
    setPasswordStrength(null);
  };

  const submitButton = useRef(null);

  const handleInputChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);

    if (passwordStrength >= 3) {
      submitButton.current.focus();
    }
  };

  const handleRepeatePasswordChange = (event) => {
    event.preventDefault();
    const newRepeatePassword = event.target.value;
    setRepeatePasword(newRepeatePassword);
    checkPasswordMatch(newRepeatePassword);
  };

  const toogleShowPassword1 = () => {
    setShowPassword(!showPassword);
  };

  const toogleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const checkPasswordMatch = (newRepeatePassword) => {
    setPasswordMathcError(newRepeatePassword !== password);
  };

  const checkPasswordStrength = (newPassword) => {
    const minLength = 6;
    setLengthError(newPassword.length < minLength);

    const isLengthValid = newPassword.length >= minLength;
    const hasLetters = /[a-z]/.test(newPassword);
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      newPassword
    );

    const strenght =
      isLengthValid + hasLetters + hasUpperCase + hasNumber + hasSpecialChars;

    setPasswordStrength(strenght);
  };

  const getStrengthColor = () => {
    if (lengthError) {
      return "red";
    } else if (passwordStrength === null) {
      return "";
    } else if (passwordStrength <= 1) {
      return "";
    } else if (passwordStrength <= 2) {
      return "DeepPink";
    } else if (passwordStrength <= 3) {
      return "orange";
    } else if (passwordStrength <= 4) {
      return "yellow";
    } else if (passwordStrength <= 5) {
      return "SpringGreen";
    }
  };

  const onChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit} className="box">
        <h2>Страница регистрации нового пользователя</h2>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Введите свой Email"
          onChange={onChangeEmail}
        ></input>
        <h2>Password</h2>
        <div className="password1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Введите пароль"
            value={password}
            onChange={handleInputChange}
          />
          <FaEye onClick={toogleShowPassword1} />
        </div>
        <div className="password2">
          <input
            type={showPassword2 ? "text" : "password"}
            placeholder="Введите пароль повторно"
            value={repeatePassword}
            onChange={handleRepeatePasswordChange}
          />
          <FaEye onClick={toogleShowPassword2} />
        </div>
        <div className="str-info">
          {lengthError && <p style={{ color: "red" }}>Минимум 6 символов</p>}
          {passwordMatchError && (
            <p style={{ color: "red" }}>Пароли не совпадают</p>
          )}
          {passwordStrength !== null && !lengthError && (
            <p style={{ color: getStrengthColor() }}>
              {passwordStrength === 1 && "очень слабый пароль"}
              {passwordStrength === 2 && "слабый пароль"}
              {passwordStrength === 3 && "нормальеый пароль"}
              {passwordStrength === 4 && "отличный пароль"}
              {passwordStrength === 5 && "великолепный пароль"}
            </p>
          )}
        </div>
        <button
          className="custom btn"
          type="submit"
          onClick={onSubmit}
          ref={submitButton}
          disabled={passwordStrength < 1}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
