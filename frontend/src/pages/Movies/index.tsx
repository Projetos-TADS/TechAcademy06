import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../providers/UserContext";
import { MovieContext } from "../../providers/MovieContext";
import { ActorContext } from "../../providers/ActorContext";
import { DirectorContext } from "../../providers/DirectorContext";
import { BlockbusterHeader } from "../../components/Header";
import { MovieGrid } from "../../components/MovieGrid";
import { PeopleList } from "../../components/PeopleList/PeopleList";
import { CreateNewActorForm } from "../../components/ActorCreateForm";
import { ActorUpdateForm } from "../../components/ActorUpdateForm";
import { CreateNewDirectorForm } from "../../components/DirectorCreateForm";
import { DirectorUpdateForm } from "../../components/DirectorUpdateForm";

export const MoviesPage = () => {
  const { user, favoritesLoad } = useContext(UserContext);
  const { moviesList, currentPage, setCurrentPage } = useContext(MovieContext);
  const { actorsList, actorDelete } = useContext(ActorContext);
  const { directorsList, directorDelete } = useContext(DirectorContext);

  const { pageNumber } = useParams();
  const [editingMovieId, setEditingMovieId] = useState("");
  const [editingActorId, setEditingActorId] = useState("");
  const [editingDirectorId, setEditingDirectorId] = useState("");
  const [isCreateActorModalOpen, setIsCreateActorModalOpen] = useState(false);
  const [isCreateDirectorModalOpen, setIsCreateDirectorModalOpen] = useState(false);
  const [isEditActorModalOpen, setIsEditActorModalOpen] = useState(false);
  const [isEditDirectorModalOpen, setIsEditDirectorModalOpen] = useState(false);

  const editingMovie = moviesList?.find((movie) => movie.movieId === editingMovieId);
  const editingActor = actorsList?.data.find((actor) => actor.actorId === editingActorId);
  const editingDirector = directorsList?.data.find(
    (director) => director.directorId === editingDirectorId
  );

  useEffect(() => {
    favoritesLoad();
  }, []);

  useEffect(() => {
    if (pageNumber) {
      const page = parseInt(pageNumber);
      if (!isNaN(page) && page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [pageNumber]);

  return (
    <main>
      <BlockbusterHeader />
      <section>
        <MovieGrid
          editingMovie={editingMovie}
          editingMovieId={editingMovieId}
          setEditingMovieId={setEditingMovieId}
        />
      </section>

      {user?.admin && (
        <>
          <PeopleList
            title="ATOR"
            people={
              actorsList?.data.map((actor) => ({
                id: actor.actorId,
                name: actor.name,
                birthDate: actor.birthDate,
                nationality: actor.nationality,
              })) || []
            }
            onEdit={(id) => {
              setEditingActorId(id);
              setIsEditActorModalOpen(true);
            }}
            onDelete={actorDelete}
            onCreate={() => setIsCreateActorModalOpen(true)}
          />

          <PeopleList
            title="DIRETOR"
            people={
              directorsList?.data.map((director) => ({
                id: director.directorId,
                name: director.name,
                birthDate: director.birthDate,
                nationality: director.nationality,
              })) || []
            }
            onEdit={(id) => {
              setEditingDirectorId(id);
              setIsEditDirectorModalOpen(true);
            }}
            onDelete={directorDelete}
            onCreate={() => setIsCreateDirectorModalOpen(true)}
          />

          <CreateNewActorForm
            open={isCreateActorModalOpen}
            onClose={() => setIsCreateActorModalOpen(false)}
          />

          {isEditActorModalOpen && editingActor && (
            <ActorUpdateForm
              actor={editingActor}
              open={isEditActorModalOpen}
              onClose={() => {
                setIsEditActorModalOpen(false);
                setEditingActorId("");
              }}
            />
          )}

          <CreateNewDirectorForm
            open={isCreateDirectorModalOpen}
            onClose={() => setIsCreateDirectorModalOpen(false)}
          />

          {isEditDirectorModalOpen && editingDirector && (
            <DirectorUpdateForm
              director={editingDirector}
              open={isEditDirectorModalOpen}
              onClose={() => {
                setIsEditDirectorModalOpen(false);
                setEditingDirectorId("");
              }}
            />
          )}
        </>
      )}
    </main>
  );
};
