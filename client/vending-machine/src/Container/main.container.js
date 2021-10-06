import React, { Component } from 'react'

import {Container,Box, Grid, Paper, Button, InputLabel, OutlinedInput, InputAdornment} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import * as Apis from '../lib/Apis';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 80
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

class MainContainer extends Component {
  state = {    
    items :[],
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
    this.setState({
      selectedDrink: props
    });
  }

  buyHandler = async(e) => {
    e.preventDefault();
    if(!this.state.selectedDrink) {
      alert('must select drink!!!');      
      return;
    }
    if(!this.state.enteredAmount) {
      alert('must enter amount!!!');
      return;
    }
    try {
      const data = {
        amount: this.state.enteredAmount
      }
      const request = await Apis.request('POST', Apis.APIS.BUY_ITEM.replace('[ITEMCODE]', this.state.selectedDrink.code), data);
      if(request) {        
        const msg = request.data.message;
        const returnAmount = request.data.returnAmount
        alert(`${msg}\nreturn: ${returnAmount}`);
      } else {
        alert(`Item ${this.state.selectedDrink.name} not bought`);
      }
    } catch(ex)  {
      const { response } = ex;
      const msg = response.data.message ? response.data.message: 'item not bought';
      alert(msg);
    }
    this.resetStateData();
  }
  
  refundHandler = async(e) => {
    e.preventDefault();
    if(!this.state.selectedDrink) {
      alert('must select drink!!!');
      return;
    }
    try {
      const request = await Apis.request('POST', Apis.APIS.REFUND_ITEM.replace('[ITEMCODE]', this.state.selectedDrink.code));
      if(request) {
        const msg = request.data.message;
        alert(msg);
      } else {
        alert(`Item ${this.state.selectedDrink.name} not refunded`);
      }
    } catch(ex)  {
      console.log("ex", ex);
      const { response } = ex;
      const msg = response.data.message ? response.data.message: 'item not refunded';
      alert(msg);
    }
    this.resetStateData();
  }

  resetStateData = () => {
    this.setState({
      enteredAmount: null,
      selectedDrink: null
    })
  }
  componentDidMount() {
    const request = Apis.request('GET', Apis.APIS.GET_ITEMS);
    if(request){
      request
        .then(resp => {
          console.log(resp.data.Items);
          if(resp.data && resp.data.Items) {
            this.setState({
              items: resp.data.Items
            })
          }
        })
        .catch(err => {
          console.log("err",err);
        });
    }
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
                <Item 
                  key={idx} 
                  elevation={16} 
                  id={itm.code} 
                  onClick={this.drinkSelectHandler(itm)}
                  style={{
                    background: `${(this.state.selectedDrink && this.state.selectedDrink.code && this.state.selectedDrink.code === itm.code)  ? "gray": ""}`
                  }}
                  >
                  <img 
                  src={`../imgs/${itm.name.toLowerCase()}.png`} 
                  alt={itm.name} 
                  title={itm.name} height="80px"
                  />
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
            value={this.state.enteredAmount ? this.state.enteredAmount : ''}        
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