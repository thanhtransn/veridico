import { createContext, useContext, useEffect, useState, type ReactElement } from "react";
import { authenticatedRequest } from "../API/apiCall";

type Props = { children: ReactElement }
export const AuthContext = createContext<{ user: Record<string, any>, setUserContext: (data: any) => void }>({} as any);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);

  const setUserContext = (userData: any) => setUser(userData)

  useEffect(() => {
    const fetch = async () => {
      const currentUser = await authenticatedRequest({
        path: 'user/my-profile',
        method: 'GET'
      })
      if (currentUser) {
        setUserContext(currentUser)
      }
    }
    fetch()
  }, [])
  return (
    user && <AuthContext.Provider value={{ user, setUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};
