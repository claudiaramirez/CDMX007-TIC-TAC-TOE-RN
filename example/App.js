import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity,Alert, Button, ImageBackground} from 'react-native';

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
      // winner:null,
      xWins : 0,
      oWins : 0,
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
    // currentPlayer:1,
    });
  }
  getWinner = ()=>{
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;


    //rows
    for( var i = 0; i < NUM_TILES; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum === 3){return 1;}
      else if (sum === -3) {return -1;}
      
    }
    //columns
    for( var i = 0; i < NUM_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum === 3){return 1;}
      else if(sum === -3) {return -1;}
      
    }
    //diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum === 3){return 1;}
    else if(sum === -3 ){return -1;}
    
  
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if(sum === 3){return 1;}
    else if(sum === -3){return -1;}
    
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
    var nextPlayer = (currentPlayer === 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});
    //determinar ganador
    var winner = this.getWinner();
    if(winner === 1){
      Alert.alert("Won beach ball!!");
      this.setState({xWins: this.state.xWins + 1})
      this.initializeGame();
    }else if(winner === -1){
      Alert.alert("Won sandbucket!!");
      this.setState({oWins: this.state.oWins + 1})
      this.initializeGame();
    }
  }
  
  onNewGamePress = () =>{
    this.setState({xWins: this.state.xWins = 0})
    this.setState({oWins: this.state.oWins = 0})
    this.initializeGame();
  }

  renderIcon = (row, col) =>{
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Image style={styles.tileX}
      source={require('./assets/beachball.png')}/>;
      case -1: return <Image style={styles.tileO}
      source={require('./assets/sandbucket.png')}/>;
      default: return <View/>;
    }
  }
  render() {
    return (
      <ImageBackground source={require('./assets/beach.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tic Tac Toe</Text>
        </View>
        <View>
          <Text>nextPlayer</Text>
        </View>
        <View style={styles.ticTacToe}>
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
            <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style={[styles.tile]}>
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
        </View>

      <View style={styles.itemScoore}>
      <Text style={styles.titleScoore}>Scoore</Text>
        <View style={styles.scoores}>
          <View style={styles.scoores1}>
              <Image  source={require('./assets/beachball.png')} style={styles.imgScoore} />
            <Text style={styles.titleWin}>Wins</Text>
            <Text style={styles.numberWin}>{this.state.xWins}</Text>
          </View>
          <View style={styles.scoores1}>
              <Image source={require('./assets/sandbucket.png')} style={styles.imgScoore} />
            <Text style={styles.titleWin}>Wins</Text>
            <Text style={styles.numberWin}>{this.state.oWins}</Text>
          </View> 
        </View>
      </View>
        <View style={styles.btnNewGame}>
          <Button onPress={this.onNewGamePress} style={styles.NewGame}  title="NEW GAME"/> 
        </View>
      </View>
    </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#6bd4cc',
    zIndex: 10,
    alignItems:'center',
    justifyContent:'center',
  },
  title:{
    fontSize: 30,
    color:'#fff',
  },
  ticTacToe:{ 
    alignItems:'center',
    justifyContent:'center',
  },
  tile:{
    borderWidth: 2, 
    borderColor: '#ffffff',
    width: 100, 
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCero:{
    borderLeftWidth:0,
    borderTopWidth:0,
  },
  itemOne:{
    borderTopWidth:0,
  },
  itemTwo:{
    borderRightWidth:0,
    borderTopWidth:0,
  },
  itemThree:{
    borderLeftWidth:0,
  },
  itemFive:{
    borderRightWidth:0,
  },
  itemSix:{
    borderLeftWidth:0,
    borderBottomWidth:0,
  },
  itemSeven:{
    borderBottomWidth:0,
  },
  itemEight:{
    borderRightWidth:0,
    borderBottomWidth:0,
  },
  tileX:{
    width:70, 
    height:70,
  },
  tileO:{
    width:80, 
    height:80,
  },
  btnNewGame:{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 60,
  },
  itemScoore:{ 
    backgroundColor:'rgba(242, 242, 242, 0.7)',
    alignItems:'center',
    fontSize: 30,
    marginTop:40,
  },
  titleScoore:{
    marginTop:20,
    color:'#5784BA',
    fontSize:20,
  },
  scoores:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    width: 300, 
    height: 100,
  },
  scoores1:{
    width: 50, 
    height: 50, 
   alignItems:'center',
   justifyContent: 'center',
  },
  imgScoore:{
    width: 40, 
    height: 40,
  },
  titleWin:{
    letterSpacing: 1, 
    fontSize: 16,
    color:'#5784BA'
  }, 
  numberWin:{
    color:'#5784BA',
    fontSize: 24,
  },
  NewGame:{
    flex:1,
    height:'60',
    fontSize: 60,
  },
});

