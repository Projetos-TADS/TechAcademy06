import { useContext, useState } from "react";
import {
  StarFilled,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Select, Tag, Pagination, Popconfirm, Carousel } from "antd";
import Card from "antd/es/card";
import Grid from "antd/es/grid";
import Rate from "antd/es/rate";
import { UserContext } from "../../providers/UserContext";
import { IMovie, MovieContext } from "../../providers/MovieContext";
import { ActorContext } from "../../providers/ActorContext";
import { DirectorContext } from "../../providers/DirectorContext";
import { MovieUpdateForm } from "../../components/MovieUpdateForm";
import { CreateNewMovieForm } from "../../components/MovieCreateForm";

const { Meta } = Card;
const { Option } = Select;
const { useBreakpoint } = Grid;

interface MovieGridProps {
  editingMovie: IMovie | undefined;
  editingMovieId: string;
  setEditingMovieId: React.Dispatch<React.SetStateAction<string>>;
}

export const MovieGrid = ({ editingMovie, editingMovieId, setEditingMovieId }: MovieGridProps) => {
  const { user, favoritesList, favoritesLoad, removeMovieFromFavorite, addMovieToFavorite } =
    useContext(UserContext);
  const {
    moviesList,
    currentPage,
    totalItems,
    itemsPerPage,
    handlePageChange,
    movieDelete,
    addActorToMovie,
    addDirectorToMovie,
    removeActorFromMovie,
    removeDirectorFromMovie,
  } = useContext(MovieContext);
  const { actorsList } = useContext(ActorContext);
  const { directorsList } = useContext(DirectorContext);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const screens = useBreakpoint();

  const handleRemoveFavorite = async (movieId: string) => {
    const favorite = favoritesList?.find((fav) => fav.movieId === movieId);
    if (favorite) {
      await removeMovieFromFavorite(favorite.favoriteMovieId);
      await favoritesLoad();
    }
  };

  const handleAddFavorite = async (movieId: string) => {
    await addMovieToFavorite(movieId);
    await favoritesLoad();
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: screens.lg ? "repeat(4, 1fr)" : screens.md ? "repeat(2, 1fr)" : "1fr",
    gap: "1rem",
    padding: "1.5rem",
  };

  const coverContainerStyle: React.CSSProperties = {
    height: "30rem",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    margin: 0,
    padding: 0,
    backgroundColor: "#f0f2f5",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "30rem",
    objectFit: "cover",
    display: "block",
    margin: 0,
  };

  const getImageUrl = (pathOrFilename: string) => {
    if (!pathOrFilename) return "";
    if (pathOrFilename.startsWith("http://") || pathOrFilename.startsWith("https://")) {
      return pathOrFilename;
    }

    const cleanPath = pathOrFilename.startsWith("/") ? pathOrFilename.slice(1) : pathOrFilename;

    return `${window.location.origin}/uploads/${cleanPath}`;
  };

  return (
    <div style={{ padding: "1.5rem", marginTop: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            fontFamily: "var(--font-logo)",
            textAlign: "center",
            margin: 0,
          }}
        >
          LISTA DE FILMES
        </h1>
        {user?.admin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
            title="Novo Filme"
          />
        )}
      </div>

      <div style={gridStyle}>
        {moviesList?.map((currentMovie) => (
          <Card
            key={currentMovie.movieId}
            hoverable
            style={{ cursor: "default", overflow: "hidden" }}
            cover={
              <div style={coverContainerStyle}>
                {currentMovie.images && currentMovie.images.length > 0 ? (
                  <Carousel
                    autoplay
                    effect="fade"
                    autoplaySpeed={3000}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {currentMovie.images.map((img) => (
                      <div key={img.id}>
                        <img
                          alt={currentMovie.title}
                          src={getImageUrl(img.filename || img.path)}
                          style={imageStyle}
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <img alt={currentMovie.title} src={currentMovie.urlImage} style={imageStyle} />
                )}
              </div>
            }
            actions={[
              favoritesList?.some((fav) => fav.movieId === currentMovie.movieId) ? (
                <Button
                  icon={<StarFilled style={{ color: "var(--secondary-color)" }} />}
                  onClick={() => handleRemoveFavorite(currentMovie.movieId)}
                  title="Remover dos favoritos"
                />
              ) : (
                <Button
                  icon={<StarOutlined />}
                  onClick={() => handleAddFavorite(currentMovie.movieId)}
                  title="Adicionar aos favoritos"
                />
              ),
              user?.admin && (
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditingMovieId(currentMovie.movieId);
                  }}
                />
              ),
              user?.admin && (
                <Popconfirm
                  title="Tem certeza que deseja excluir este filme?"
                  onConfirm={() => movieDelete(currentMovie.movieId)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button icon={<DeleteOutlined />} danger />
                </Popconfirm>
              ),
            ].filter(Boolean)}
          >
            <Meta
              title={currentMovie.title}
              description={
                <>
                  <Rate disabled defaultValue={currentMovie.rating} style={{ fontSize: "14px" }} />
                  <p>{currentMovie.description}</p>
                  <p>
                    <strong>Ano:</strong> {currentMovie.releaseYear}
                  </p>
                  <p>
                    <strong>Duração:</strong> {currentMovie.duration} min
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <strong>Atores:</strong>
                    <div style={{ marginTop: "4px" }}>
                      {currentMovie.actors.length > 0 ? (
                        currentMovie.actors.map((actor) => (
                          <Tag
                            key={actor.actorId}
                            closable={user?.admin}
                            onClose={() =>
                              user?.admin && removeActorFromMovie(actor.CastModel?.castId)
                            }
                            style={{ marginBottom: "4px" }}
                          >
                            {actor.name}
                          </Tag>
                        ))
                      ) : (
                        <span>Nenhum ator</span>
                      )}
                    </div>
                    {user?.admin && (
                      <Select
                        style={{ width: "100%", marginTop: "8px" }}
                        placeholder="Adicionar ator"
                        onChange={(value) => addActorToMovie(currentMovie.movieId, value)}
                      >
                        {actorsList?.data.map((actor) => (
                          <Option key={actor.actorId} value={actor.actorId}>
                            {actor.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </div>

                  <div style={{ marginTop: "12px" }}>
                    <strong>Diretores:</strong>
                    <div style={{ marginTop: "4px" }}>
                      {currentMovie.directors.length > 0 ? (
                        currentMovie.directors.map((director) => (
                          <Tag
                            key={director.directorId}
                            closable={user?.admin}
                            onClose={() =>
                              user?.admin &&
                              removeDirectorFromMovie(director.DirectorMovie?.directorMovieId)
                            }
                            style={{ marginBottom: "4px" }}
                          >
                            {director.name}
                          </Tag>
                        ))
                      ) : (
                        <span>Nenhum diretor</span>
                      )}
                    </div>
                    {user?.admin && (
                      <Select
                        style={{ width: "100%", marginTop: "8px" }}
                        placeholder="Adicionar diretor"
                        onChange={(value) => addDirectorToMovie(currentMovie.movieId, value)}
                      >
                        {directorsList?.data.map((director) => (
                          <Option key={director.directorId} value={director.directorId}>
                            {director.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </div>
                </>
              }
            />
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <CreateNewMovieForm open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      {editingMovie && (
        <MovieUpdateForm
          movie={editingMovie}
          onClose={() => setEditingMovieId("")}
          visible={!!editingMovieId}
        />
      )}
    </div>
  );
};
