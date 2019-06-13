import React from 'react'
import { Button, SafeAreaView, Text, TouchableHighlight, View } from 'react-native'

const newGameState = {
  squares: Array(9).fill(null),
  xIsNext: true,
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = newGameState
  }

  whoseTurn() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  onNewGame() {
    this.setState(newGameState)
  }

  onMove(i) {
    let newSquares = this.state.squares.slice()
    const turn = this.whoseTurn()
    if (this.state.squares[i] || winner(this.state.squares)) return null
    newSquares[i] = turn
    this.setState({
      squares: newSquares,
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    const style = {
      backgroundColor: 'beige',
      flex: 1,
      alignItems: 'center',
    }

    return (
      <SafeAreaView style={style}>
        <Board squares={this.state.squares} onMove={(i) => this.onMove(i)} />
        <Status turn={this.whoseTurn()} winner={winner(this.state.squares)} onNewGame={() => this.onNewGame()} />
      </SafeAreaView>
    )
  }
}

const Board = ({squares, onMove}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Row squares={squares} startIndex={0} onMove={onMove} />
      <Row squares={squares} startIndex={3} onMove={onMove} />
      <Row squares={squares} startIndex={6} onMove={onMove} />
    </View>
  )
}

const Row = ({squares, startIndex, onMove}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Square label={squares[startIndex    ]} onPress={() => onMove(startIndex    )} />
      <Square label={squares[startIndex + 1]} onPress={() => onMove(startIndex + 1)} />
      <Square label={squares[startIndex + 2]} onPress={() => onMove(startIndex + 2)} />
    </View>
  )
}

const Square = ({label, onPress}) => {
  const style = {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
  }

  const textStyle = {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  }

  return (
    <TouchableHighlight style={style} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </TouchableHighlight>
  )
}

const Status = ({turn, winner, onNewGame}) => {
  const text = winner === null ? 'Tie game :-/'
        : winner !== undefined ? winner + ' wins!'
        : turn + "'s turn"

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 36, textAlign: 'center'}}>{text}</Text>
      <Button title='Start new game' onPress={onNewGame} />
    </View>
  )
}

const winner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  if (squares.indexOf(null) === -1) return null // tie game
  return undefined
}

 //   const full = this.state.boardState.reduce((acc, el) => {
  //     return el.reduce((acc, el) => {
  //       return el === 0 ? false  : acc
  //     }, acc) 
  //  }, true);
  
    // const full = this.state.boardState (row, col) => {
    //     return full === 0 ? false  : true
    // };
