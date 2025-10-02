import { useAppSelector } from "../hooks/reduxHook";
import LoginForm from "../components/LoginForm";
import './styles/LoginPage.css';

export default function LoginPage() {
  const { loggedUser } = useAppSelector((state: { users: any; }) => state.users);
  if (loggedUser && loggedUser != undefined) {
    console.log(`logged: ${JSON.stringify(loggedUser)}`);
    
    return <p>Ya estás logueado como <strong>{loggedUser.name}</strong>.</p>;
  }

  return (
    <div className="login-page-container">
      <LoginForm />
    </div>
  );
}