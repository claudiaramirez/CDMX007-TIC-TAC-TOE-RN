import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity,Alert, Button,} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () =>{
    this.setState({ gameState:
    [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    currentPlayer:1,

    });
  }
  getWinner = ()=>{
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
    for( var i = 0; i < NUM_TILES; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3){return 1;}
      else if (sum == -3) {return -1; }
    }
    for( var i = 0; i < NUM_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3){return 1;}
      else if(sum == -3) {return -1; }
    }
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3){return 1;}
    else if(sum == -3){return -1;}
  
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if(sum == 3){return 1;}
    else if(sum== -3){return -1;}
    return 0;
  }

  onTilePress = (row, col) =>{
    //no permite cambiar de icon
    var value = this.state.gameState[row][col];
    if(value !== 0){return;}
    //que jugador se da click
    var currentPlayer = this.state.currentPlayer;
    //tomar icon correcto
    var arr = this.state.gameState.slice();
    arr[row][col]= currentPlayer;
    this.setState({gameState: arr});
    //next player en caso de 1 o -1
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});
    //determinar ganador
    var winner = this.getWinner();
    if(winner == 1){
      Alert.alert("gano jugador 1");
      this.initializeGame();
    }else if(winner == -1){
      Alert.alert("gano jugador 2");
      this.initializeGame();
    }
  }
  onNewGamePress = () =>{
    this.initializeGame();
  }

  renderIcon = (row, col) =>{
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Image style={styles.tileX}
      source={require('./assets/rabbit.png')}/>;
      case -1: return <Image style={styles.tileO}
      source={require('./assets/carrot.png')}/>;
      default: return <View/>;
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> this.onTilePress(0,0)} style={[styles.tile , styles.itemCero]}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(0,1)} style={[styles.tile , styles.itemOne]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(0,2)} style={[styles.tile , styles.itemTwo]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> this.onTilePress(1,0)} style={[styles.tile , styles.itemThree]}>
          {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style={[styles.tile , styles.itemFour]}>
          {this.renderIcon(1,1)} 
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(1,2)} style={[styles.tile , styles.itemFive]}>
          {this.renderIcon(1,2)}  
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> this.onTilePress(2,0)} style={[styles.tile , styles.itemSix]}>
          {this.renderIcon(2,0)}  
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(2,1)} style={[styles.tile , styles.itemSeven]}>
          {this.renderIcon(2,1)}  
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(2,2)} style={[styles.tile , styles.itemEight]}>
          {this.renderIcon(2,2)}  
          </TouchableOpacity>
        </View>
        <Button onPress={this.onNewGamePress} title="Nuevo juego"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth: 1, 
    width: 100, 
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCero:{
    borderLeftWidth:0,
    borderTopWidth:0,
  },
  tileX:{
    width:70, 
    height:70,
    
  },
  tileO:{
    width:80, 
    height:80,
  }
});