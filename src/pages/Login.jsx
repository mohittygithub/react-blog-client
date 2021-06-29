import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { loginAction, registerAction } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useHistory } from "react-router-dom";
import { PATHS } from "../utils/api";

export const Login = () => {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userReducer);
  const { loading, error } = userInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showRegisterForm && email && password) {
      dispatch(loginAction(email, password));
      error
        ? NotificationManager.error("Incorrect username/password.")
        : history.push(PATHS.HOME);
    } else {
      const compare = password === confirmPassword;
      console.log(compare);
      if (compare) {
        dispatch(registerAction(name, profileImage, email, password));
        error
          ? NotificationManager.error("Email already registered.")
          : history.push(PATHS.HOME);
      } else {
        NotificationManager.error("Passwords did not match!");
      }
    }
  };

  const profileImageHandler = async (e) => {
    let name = e.target.files[0].name.split(".");

    if (e.target.files[0] && e.target.files[0].size > Number(10000000)) {
      NotificationManager.warning(
        "Selected Image Is Oversized.",
        "Warning",
        2000
      );
      e.target.value = "";
      return;
    }

    if (
      e.target.files[0] &&
      !(name[1] === "jpg" || name[1] === "jpeg" || name[1] === "png")
    ) {
      NotificationManager.warning(
        "Selected Image Is Not Valid.",
        "Warning",
        2000
      );
      e.target.value = "";
      return;
    }

    const file = e.target.files[0];
    const base64Image = await convertToBase64(file);
    setProfileImage(base64Image);

    // this.props.updateUserAccountProfilePicture(base64Image);
    // setTimeout(function () {
    //   NotificationManager.success("Success", "Success", 2000);
    // }, 3000);

    e.target.value = "";
  };

  // helper method for profileImageHandler
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  return (
    <div className="login">
      <NotificationContainer />
      <Container>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <h1 className="mb-4 text-center">
            {showRegisterForm ? "Register" : "Login"}
          </h1>
          {showRegisterForm && (
            <>
              {" "}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicFile">
                <Form.Label htmlFor="custom-button" className="btn btn-info">
                  Choose Profile Picture
                </Form.Label>

                <Form.Control
                  id="custom-button"
                  type="file"
                  hidden
                  onChange={(e) => profileImageHandler(e)}
                />
                {profileImage && (
                  <span className="text-muted ml-2">image added!</span>
                )}
              </Form.Group>
            </>
          )}
          <Form.Group controlId="formBasicFile">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {showRegisterForm && (
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          )}
          {!showRegisterForm && (
            <Form.Group controlId="formBasicCheckbox" className="mt-3">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" block disabled={loading}>
            {showRegisterForm ? "Register" : "Login"}
          </Button>
          <Form.Text className="text-muted">
            {showRegisterForm ? (
              <p>
                Have Account?{" "}
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => setShowRegisterForm(false)}
                >
                  Login here.
                </span>
              </p>
            ) : (
              <p>
                Not registered?{" "}
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => setShowRegisterForm(true)}
                >
                  Register here.
                </span>
              </p>
            )}
          </Form.Text>
        </Form>
      </Container>
    </div>
  );
};
