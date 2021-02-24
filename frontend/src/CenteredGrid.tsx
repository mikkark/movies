import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const RootDiv = styled.div`
	flex-grow: 1;
`;

const HeaderPanel = styled(Paper)`
	text-align: center;
	padding: 1em;
`;

// Aaand this could be changed to styled-components instead.
const useStyles = makeStyles((theme) => ({  
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <RootDiv>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderPanel>s=12</HeaderPanel>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>xs=9</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>        
      </Grid>
    </RootDiv>
  );
}