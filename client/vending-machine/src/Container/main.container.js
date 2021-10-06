import React, { Component } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import {Container,Box, Grid, Paper, Button, InputLabel, OutlinedInput, InputAdornment} from '@mui/material';
// import { ShoppingCart, KeyboardReturn} from "@mui/icons-material";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 80,
  lineHeight: '80px',
  variant: 'elevation3'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

class MainContainer extends Component {
  state = {    
    items : [{
      code: 'sd101',
      name: 'Coke'
    },{
      code: 'sd102',
      name: 'Pepsi'
    },{
      code: 'sd101',
      name: 'Dew'
    }],
    selectedDrink : null,  
    enteredAmount: null  
  }

  setAmountHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if(isNaN(e.target.value)) {
      alert('only number')
      return;
    }
    this.setState({
      enteredAmount: e.target.value
    })
  }

  drinkSelectHandler = props => (e) => {
    e.preventDefault();
    console.log(props)
    this.setState({
      selectedDrink: props
    });
  }

  buyHandler = (e) => {
    e.preventDefault();
    if(!this.state.selectedDrink) {
      alert('must select drink!!!');      
      return;
    }
    if(!this.state.enteredAmount) {
      alert('must enter amount!!!');
      return;
    }
    this.resetStateData();
  }
  
  refundHandler = (e) => {
    e.preventDefault();
    if(!this.state.selectedDrink) {
      alert('must select drink!!!');
      return;
    }
    this.resetStateData();
  }

  resetStateData = () => {
    this.setState({
      enteredAmount: null,
      selectedDrink: null
    })
  }

  render() {
   return (
      <React.Fragment>
      <Container maxWidth="sm">
        <Grid container spacing={0}>
        <Grid xs={6} item key={0}>
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{                
                p: 2,
                bgcolor: '#0a0a0a',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
                height: "200px",  

              }}
            >
              {this.state.items.map((itm, idx) => (
                <Item key={idx} elevation={4} id={itm.code} onClick={this.drinkSelectHandler(itm)}>
                  {/* {itm.name} */}
                  <img src={`../imgs/${itm.name.toLowerCase()}.png`} alt={itm.name} title={itm.name} height="80px"></img>
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
        <Grid xs={4} item key={1}>
        <ThemeProvider theme={darkTheme}>
        <Box
              sx={{                
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gap: 1,
                height: "200px"
              }}
            >       
           
          <OutlinedInput
            id="outlined-adornment-amount"            
            onChange={this.setAmountHandler}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"            
          />
           <Button variant="outlined" size="large" onClick={this.buyHandler}>buy</Button>
           <Button variant="outlined" size="large" onClick={this.refundHandler}>refund</Button>   
          
          </Box>
          </ThemeProvider>
        </Grid>
        </Grid>
      </Container>
    </React.Fragment>     
      )

  }
}

export default MainContainer;