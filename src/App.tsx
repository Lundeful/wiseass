import React from "react";
import "./App.css";
import { MemoryRouter, Route } from "react-router-dom";
import { SignIn } from "./pages/signin/SignIn";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/Auth";
import styles from './App.module.css';
import { ChatRoom } from "./pages/chatroom/chatroom";

const App = () => {
	return (
    <MemoryRouter>
      <div className={styles.container}>
        <AuthProvider>
          <ProtectedRoute exact path="/" component={ChatRoom}/>
          <Route exact path="/signin" component={SignIn}/>
        </AuthProvider>
      </div>
    </MemoryRouter>
	);
}


export default App;
