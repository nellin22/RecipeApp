import { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './styles.css';

export default function Login () {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null); // Virhetilan hallinta
    const [loading] = useState(false);
    const history = useHistory();

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const auth = getAuth();
    
            // Nollaa virheet ennen uutta yritystä
            setError(null);
    
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
    
            try {
                await signInWithEmailAndPassword(auth, email!, password!); // Kirjaudu sisään
                // Onnistunut kirjautuminen, voit siirtyä eteenpäin, esim. redirect
                history.push("/tab1"); 
            } catch (err: any) {
                // Käsittele virhe
                setError(err.message); // Näytä virhe
            }
        };
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2 className="auth-title">Log In</h2>
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
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="auth-link">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="auth-link">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
                </div>
            </div>
        );
    }