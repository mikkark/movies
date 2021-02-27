import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IMovie, IMoviesContext } from './Types';
import MoviesList from './MoviesList';
import CategoriesList from './CategoriesList';

const AppDiv = styled.div`
  max-width: 80%;
  margin-left: 10%;
  padding-top: 2em;
`;

const MainGridContainer = styled.div`
  display: grid;  
  grid-template-rows: auto 1fr auto;
  min-height: 100vh; 
  grid-row-gap: 1em;
  grid-column-gap: 10px;
`;

const MainContentContainer = styled.div`
  display: flex;
`;

const Header = styled.div`
  text-align: center;
`;

const CategoriesListContainer = styled.div`
  width: 20%;
  padding-right: 2em;
`;

const MoviesListContainer = styled.div`
  width: 50%;
`;

const Footer = styled.div`
  text-align: center;
`;

const categories = [
  { id: "drama", friendlyName: "Drama" },
  { id: "comedy", friendlyName: "Comedy" },
  { id: "sci-fi", friendlyName: "Scifi" },
  { id: "adventure", friendlyName: "Adventure" },
  { id: "crime", friendlyName: "Crime" },
  { id: "animation", friendlyName: "Animation" },
  { id: "romance", friendlyName: "Romance" },
  { id: "mystery", friendlyName: "Mystery" },
  { id: "western", friendlyName: "Western" },
  { id: "horror", friendlyName: "Horror" }
];

export const MoviesContext = createContext({} as IMoviesContext);

function App() {
  const [movies, setMovies] = useState([] as IMovie[]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(null);

  useEffect(() => {
    const realCall = async () => {
      const res = await fetch(`${process.env["REACT_APP_API_URL"]}/movie`);

      setMovies(await res.json());
    };

    realCall();
  }, [])

  const handleCategorySelected = (id: string) => {
    setSelectedCategoryId(id);
  }

  return (
    <AppDiv>
      <MainGridContainer>
        <MoviesContext.Provider value={{ movies, categories, selectedCategoryId: selectedCategoryId ?? "", onSelectCategory: handleCategorySelected }}>
          <Header>Haloota</Header>
          <MainContentContainer>
            <CategoriesListContainer>
              <CategoriesList></CategoriesList>
            </CategoriesListContainer>
            <MoviesListContainer>
              <MoviesList></MoviesList>
            </MoviesListContainer>
          </MainContentContainer>
        </MoviesContext.Provider>
        <Footer>Copyright Mikko 2021</Footer>
      </MainGridContainer>
    </AppDiv>
  );
}

export default App;
