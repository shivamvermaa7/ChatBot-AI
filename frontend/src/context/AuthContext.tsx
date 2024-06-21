//for finding the context of the user whether he is logged in or not
//provide the whole user object in which when user is logged we will be recieving detail like name email password
//have logged in property whether a user is logged in or not
//fucntion of login and logout
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//the api connector helps us to send and recieve data to backend
//and here we check if the data in backend is matched or not acc display the output on the screen
//login user logout use signup user hr cheez ka function defined h in api communicator and we will use here

import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/api-communicator";



type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;  //function for login signup and logout
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); //states within the provider
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    //to check the cookies are availiable or not
    useEffect(() => { 
      // fetch if the user's cookies are valid then skip login
      async function checkStatus() {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      }
      checkStatus();
    }, []);
    //function for login
    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      };
      //funciton for sighnup
      const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      };
      //function for logout
      const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
      };
    
      const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
      };
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    //to use context by the user
export const useAuth = () => useContext(AuthContext);