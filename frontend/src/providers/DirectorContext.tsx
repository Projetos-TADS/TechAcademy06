import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { TDirectorCreateFormValues } from "../components/DirectorCreateForm/directorCreateFormSchema";
import { TDirectorUpdateFormValues } from "../components/DirectorUpdateForm/directorUpdateFormSchema";

interface IDirectorProviderProps {
  children: React.ReactNode;
}

export interface IDirector {
  directorId: string;
  name: string;
  birthDate: string;
  nationality: string;
}

interface IDirectorResponse {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: IDirector[];
}

interface IDirectorContext {
  directorsList: IDirectorResponse | null;
  directorCreate: (formData: TDirectorCreateFormValues) => Promise<void>;
  directorDelete: (directorId: string) => Promise<void>;
  directorUpdate: (newDirectorData: TDirectorUpdateFormValues, directorId: string) => Promise<void>;
}

export const DirectorContext = createContext({} as IDirectorContext);

export const DirectorProvider = ({ children }: IDirectorProviderProps) => {
  const [directorsList, setDirectorsList] = useState<IDirectorResponse | null>(null);

  useEffect(() => {
    const directorsLoad = async () => {
      const userToken: string | null = localStorage.getItem("@USERTOKEN");

      try {
        const { data } = await api.get<IDirectorResponse>("/directors", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setDirectorsList(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      }
    };

    directorsLoad();
  }, []);

  const directorCreate = async (formData: TDirectorCreateFormValues) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      const { data } = await api.post<IDirector>("/directors", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setDirectorsList([...directorsList, data]);
      toast.success("Cadastro de diretor feito");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const directorUpdate = async (newDirectorData: TDirectorUpdateFormValues, directorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      const { data } = await api.patch<IDirector>(`/directors/${directorId}`, newDirectorData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const updatedDirectors = directorsList.filter(
        (currentDirector) => currentDirector.directorId !== directorId
      );

      setDirectorsList([...updatedDirectors, data]);

      toast.success("Diretor Atualizado");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const directorDelete = async (directorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      await api.delete(`/directors/${directorId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const updatedDirectorsList = directorsList.filter(
        (currentDirector) => currentDirector.directorId !== directorId
      );
      setDirectorsList(updatedDirectorsList);
      toast.success("Diretor deletado");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <DirectorContext.Provider
      value={{
        directorsList,
        directorCreate,
        directorDelete,
        directorUpdate,
      }}
    >
      {children}
    </DirectorContext.Provider>
  );
};
