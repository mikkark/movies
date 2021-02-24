import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import CenteredGrid from './CenteredGrid';
import styled from 'styled-components';
import { IMovie } from './Types';
import { Card, CardContent, Typography } from '@material-ui/core';

const AppDiv = styled.div`
  max-width: 80%;
  margin-left: 10%;
  padding-top: 2em;
  background-color: #cad2eb;
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
      "footer          footer          footer           footer"      
    ;
  //}  
`;

const TopHeader = styled.div`
  grid-area: header-main;
  text-align: center;
`;

const CategoriesList = styled.div`
  grid-area: categories;  
`;

const MoviesList = styled.div`
  grid-area: movies-list;
`;

const FooterDiv = styled.div`
  grid-area: footer;
`;

const MovieCard = styled(Card)`
  margin: 1em;
`;

function App() {
  const [movies, setMovies] = useState([] as IMovie[]);

  useEffect(() => {
    const realCall = async () => {
      const res = await fetch("http://localhost:7071/api/GetAllMovies");

      setMovies(await res.json());
    };

    realCall();
  }, [])

  return (
    <AppDiv>
      <MainGridContainer>
        <TopHeader>Haloota</TopHeader>
        <CategoriesList>
          {[1, 2, 3, 4, 5].map(i => {
            return <div>{i}</div>
          })}
        </CategoriesList>
        <MoviesList>
          {movies.map(movie => {
            return <MovieCard>
              <CardContent>
                <Typography color="textSecondary">
                  {movie.title}
                </Typography>
              </CardContent>
            </MovieCard>
          })}
        </MoviesList>
        <FooterDiv>Copyright Mikko 2021</FooterDiv>
      </MainGridContainer>
    </AppDiv>
  );
}

export default App;
