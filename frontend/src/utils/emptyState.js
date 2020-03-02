import blocks from './blockList'; 
const emptyState={
    newGameModelOpen:false,
    playersModelOpen:false,
    propBuyModalOpen:false,
    chanceModalOpen:false,
    communiyModelOpen:false,
    winnerModalOpen:false,
    gameIdModalOpen:false,
    blocks ,
    currentChance:{},
    currentCommunity:{},
    currentBlock:{},
    currentPlayer : 0,
    cardState:{
      color:'',
      name:'',
      rent:0,
      price:0
    },
    players:[
      {id:0,name: "Player 1",playerColor:'red',position: 0,balanceMoney: 15000,properties:[],rounds:0, steps:0},
      {id:1,name: "Player 2",playerColor:'green',position: 0,balanceMoney:15000,properties:[],rounds:0, steps:0},
      {id:2,name: "Player 3",playerColor:'blue',position:0,balanceMoney: 15000,properties:[],rounds:0, steps:0},
      {id:3,name: "Player 4",playerColor:"yellow",position:0,balanceMoney: 15000,properties:[],rounds:0, steps:0}
    ],
    playerNames:[{name:'Player1',color:'darkred'},{name:'Player2',color:'green'},{name:'Player3',color:'blue'},{name:'Player4',color:'black'}]
  };
  export default emptyState;

