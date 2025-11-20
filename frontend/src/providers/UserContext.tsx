import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TSignupFormValues } from "../components/signupForm/signupFormSchema";
import { TLoginFormValues } from "../components/signinForm/loginFormSchema";
import { TUserUpdateFormValues } from "../components/UserUpdateForm/userUpdateFormSchema";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUser {
  userId: string;
  name: string;
  email: string;
  admin: boolean;
}

interface IFavoriteResponse {
  userId: string;
  name: string;
  email: string;
  cpf: string;
  admin: boolean;
  favoriteList: IFavorite[];
}

interface IFavorite {
  movieId: string;
  favoriteMovieId: string;
  addedDate: string;
}

interface IUserContext {
  user: IUser | null;
  loading: boolean;
  userSignin: (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userSignup: (
    formData: TSignupFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userLogout: () => void;
  userUpdate: (
    newUserData: TUserUpdateFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userDelete: (userId: string) => Promise<void>;
  favoritesList: IFavorite[];
  setFavoritesList: React.Dispatch<React.SetStateAction<IFavorite[]>>;
  favoritesLoad: () => Promise<void>;
  addMovieToFavorite: (movieId: string) => Promise<void>;
  removeMovieFromFavorite: (favoriteId: string) => Promise<void>;
}

interface IUserSigninResponse {
  user: IUser;
  token: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoritesList, setFavoritesList] = useState<IFavorite[]>([]);
  const navigate = useNavigate();

  const favoritesLoad = async () => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");
    const userId: string | null = localStorage.getItem("@USERID");

    try {
      const { data } = await api.get<IFavoriteResponse>(`/favorites/all/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setFavoritesList(data.favoriteList);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");
    const userId: string | null = localStorage.getItem("@USERID");

    const userAutoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUser(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message);
        localStorage.removeItem("@USERTOKEN");
        localStorage.removeItem("@USERID");
      } finally {
        setLoading(false);
      }
    };

    userAutoLogin();
  }, []);

  const userSignin = async (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<IUserSigninResponse>("/login", formData);
      localStorage.setItem("@USERTOKEN", data.token);
      localStorage.setItem("@USERID", data.user.userId);
      setUser(data.user);
      navigate("/movies");
    } catch (error: any) {
      toast.error("Credenciais inválidas", {
        toastId: "login-error-toast",
      });
    } finally {
      setLoading(false);
    }
  };

  const userSignup = async (
    formData: TSignupFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.post<IUser>("/users", formData);
      navigate("/");
      toast.success("Usuário cadastrado com sucesso!", {
        toastId: "signup-success-toast",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message, {
        toastId: "signup-error-toast",
      });
    } finally {
      setLoading(false);
    }
  };

  const userLogout = async () => {
    localStorage.removeItem("@USERTOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  };

  const userUpdate = async (
    newUserData: TUserUpdateFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");
    const userId: string | null = localStorage.getItem("@USERID");

    try {
      setLoading(true);

      const { data } = await api.patch<IUser>(`/users/${userId}`, newUserData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setUser(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const userDelete = async (userId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      localStorage.removeItem("@USERTOKEN");
      localStorage.removeItem("@USERID");
      navigate("/");
      toast.success("Usuário deletado");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const addMovieToFavorite = async (movieId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");
    const userId: string | null = localStorage.getItem("@USERID");

    try {
      await api.post<void>(
        `/favorites/${movieId}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success("Filme favoritado");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const removeMovieFromFavorite = async (favoriteId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      await api.delete<void>(`/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      toast.success("Filme desfavoritado");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userSignin,
        userSignup,
        userLogout,
        userUpdate,
        userDelete,
        user,
        loading,
        setFavoritesList,
        favoritesList,
        favoritesLoad,
        addMovieToFavorite,
        removeMovieFromFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
