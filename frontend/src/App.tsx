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
  grid-row-gap: 1em;
  grid-column-gap: 10px;
  
  grid-template-areas:
    "header-main"
    "categories"
    "movies-list"
    "footer"
    ;
  /* @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    grid-template-rows: 1em repeat(4, 6em);
    
    grid-template-areas:
      "header-main              more-stories-header"
      "main-story               more-stories"
      "main-story               more-stories"
      "main-story               more-stories"
      "secondary-story          more-stories"      
      "most-commented-header    most-commented-header"
      "most-commented-stories   most-commented-stories"
    ;
  } */
  //@media screen and (min-width: 992px) {
    grid-template-columns: repeat(4, minmax(140px, 1fr));
    grid-template-rows: 1em repeat(4, 10em);
    
    grid-template-areas:
      "header-main              header-main              header-main    header-main"
      "categories               movies-list               movies-list           movies-list"      
      "categories               movies-list               movies-list           movies-list"      
      "categories               movies-list               movies-list           movies-list"      
      "footer          footer          footer           footer"      
    ;
  //}  
`;

const TopHeader = styled.div`
  grid-area: header-main;
  text-align: center;
`;

const CategoriesListContainer = styled.div`
  grid-area: categories;  
`;

const MoviesListContainer = styled.div`
  grid-area: movies-list;
`;

const FooterDiv = styled.div`
  grid-area: footer;
  text-align: center;
`;

const categories = [
  { id: "drama", friendlyName: "Drama" },
  { id: "comedy", friendlyName: "Comedy" },
  { id: "scifi", friendlyName: "Scifi" }
];

export const MoviesContext = createContext({} as IMoviesContext);

function App() {
  const [movies, setMovies] = useState([] as IMovie[]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(null);

  useEffect(() => {
    const realCall = async () => {
      const res = await fetch(`${process.env["REACT_APP_API_URL"]}/GetAllMovies`);

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
          <TopHeader>Haloota</TopHeader>
          <CategoriesListContainer>
            <CategoriesList></CategoriesList>
          </CategoriesListContainer>
          <MoviesListContainer>
            <MoviesList></MoviesList>
          </MoviesListContainer>
          <FooterDiv>Copyright Mikko 2021</FooterDiv>
        </MoviesContext.Provider>
      </MainGridContainer>
    </AppDiv>
  );
}

export default App;
