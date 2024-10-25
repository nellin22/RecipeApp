import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './styles.css';

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      if (emailRef.current && passwordRef.current) {
        console.log("User signed up with:", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        alert("Signup successful!");
      }
    } catch {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
        <div className="auth-card">
            <h2 className="auth-title">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                    Sign Up
                </Button>
            </Form>
            <div className="auth-link">
            Already have an account? <Link to="/login">Log In</Link>
         </div>
        </div>
    </div>
);
}