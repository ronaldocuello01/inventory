import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store";  // importa el tipo correcto
import AppRouter from "./routes/AppRouter";
import { loadUserFromStorage } from "./features/auth/authActions";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return <AppRouter />;
}
