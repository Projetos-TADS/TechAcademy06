import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { TActorCreateFormValues } from "../components/ActorCreateForm/actorCreateFormSchema";
import { TActorUpdateFormValues } from "../components/ActorUpdateForm/actorUpdateFormSchema";

interface IActorProviderProps {
  children: React.ReactNode;
}

export interface IActor {
  actorId: string;
  name: string;
  birthDate: string;
  nationality: string;
}

interface IActorResponse {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: IActor[];
}

interface IActorContext {
  actorsList: IActorResponse | null;
  actorCreate: (formData: TActorCreateFormValues) => Promise<void>;
  actorDelete: (actorId: string) => Promise<void>;
  actorUpdate: (newActorData: TActorUpdateFormValues, actorId: string) => Promise<void>;
}

export const ActorContext = createContext({} as IActorContext);

export const ActorProvider = ({ children }: IActorProviderProps) => {
  const [actorsList, setActorsList] = useState<IActorResponse | null>(null);

  useEffect(() => {
    const actorsLoad = async () => {
      const userToken: string | null = localStorage.getItem("@USERTOKEN");

      try {
        const { data } = await api.get<IActorResponse>("/actors", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setActorsList(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      }
    };

    actorsLoad();
  }, []);

  const actorCreate = async (formData: TActorCreateFormValues) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      const { data } = await api.post<IActor>("/actors", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setActorsList((prev) =>
        prev
          ? { ...prev, data: [...prev.data, data] }
          : { prevPage: null, nextPage: null, count: 1, data: [data] }
      );
      toast.success("Ator cadastrado com sucesso!", {
        toastId: "actor-success-toast",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const actorUpdate = async (newActorData: TActorUpdateFormValues, actorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      const { data } = await api.patch<IActor>(`/actors/${actorId}`, newActorData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setActorsList((prev) =>
        prev
          ? {
              ...prev,
              data: prev.data.map((actor) => (actor.actorId === actorId ? data : actor)),
            }
          : null
      );

      toast.success("Ator atualizado com sucesso!", {
        toastId: "actor-success-toast",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const actorDelete = async (actorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      await api.delete(`/actors/${actorId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setActorsList((prev) =>
        prev
          ? {
              ...prev,
              data: prev.data.filter((actor) => actor.actorId !== actorId),
              count: prev.count - 1,
            }
          : null
      );

      toast.success("Ator deletado com sucesso!", {
        toastId: "actor-success-toast",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <ActorContext.Provider
      value={{
        actorsList,
        actorCreate,
        actorDelete,
        actorUpdate,
      }}
    >
      {children}
    </ActorContext.Provider>
  );
};
