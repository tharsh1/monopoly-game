const blockList = [
    {
        id:1,
        playersOnBlock:[0,1,2,3],
        type:'START',
    },
    {
        id:2,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'OLD KENT ROAD',
        color:'brown',
        rent: 120,
        cost: 1200,
        
    },
    {
        id:3,
        playersOnBlock:[],
        type:'COMMUNITY_CHEST'
    },
    {
        id:4,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'WHITE CHAPEL ROAD',
        color:'brown',
        rent: 163.8,
        cost: 1638,
        
    },
    {
        id:5,
        playersOnBlock:[],
        type:'INCOME_TAX'
        
    },
    {
        id:6,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'KINGS CROSS STATION',
        color:'black',
        rent: 128.4,
        cost: 1284
    },
    {
        id:7,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'THE ANGEL ISLINGTON ',
        color:'lightblue',
        rent: 205.5,
        cost: 2055
    },
    {
        id:8,
        playersOnBlock:[],
        type:'CHANCE'
    },
    {
        id:9,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'EUSTON ROAD',
        color:'lightblue',
        rent: 209.8,
        cost: 2098
    },
    {
        id:10,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'PENTONVILLE ROAD',
        color:'lightblue',
        rent: 182.8,
        cost: 1828
    },
    {
        id:11,
        playersOnBlock:[],
        type:'JAIL'
    },
    {
        id:12,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'PAUL MALL',
        color:'pink',
        rent: 530.2,
        cost: 5302
    },
    {
        id:13,
        playersOnBlock:[],
        type:'PROPERTY',
        name: 'ELECTRIC COMPANY',
        color:'black',
        onDiceRoll: true,
        rent: 100,
        cost: 55
    },
    {
        id:14,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'WHITEHALL',
        color:'pink',
        rent: 249.8,
        cost: 2498
    },

    {
        id:15,
        playersOnBlock:[],
        type:'PROPERTY',
        name:"NORTUMRL'D AVENUE",
        color:'pink',
        rent: 165.9,
        cost: 1659
    },
    {
        id:16,
        playersOnBlock:[],
        type:'PROPERTY',
        name: 'MARYLEBONE STATION',
        color:'black',
        rent: 128.4,
        cost: 1284
    },
    {
        id:17,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'BOW STREET',
        color:'orange',
        rent: 713.4,
        cost: 7134
    },
    {
        id:18,
        playersOnBlock:[],
        type:'COMMUNITY_CHEST'
    },
    {
        id:19,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'MARLBOROUGH STREET',
        color:'orange',
        rent: 255.4,
        cost: 2554
    },
    {
        id:20,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'VINE STREET',
        color:'orange',
        rent: 399.5,
        cost: 3995
    },
    {
        id:21,
        playersOnBlock:[],
        type:'FREE_PARKING'
        
    },
    {
        id:22,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'STRAND',
        color:'red',
        rent: 373.2,
        cost: 3732
    },
    {
        id:23,
        playersOnBlock:[],
        type:'CHANCE'
       
    },
    {
        id:24,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'FLEET STREET',
        color:'red',
        rent: 237.8,
        cost: 2378
    },
    {
        id:25,
        playersOnBlock:[],
        type:'PROPERTY',
        name: 'TRAFALGAR SQUARE',
        color:'red',
        rent: 269.2,
        cost: 2692
    },
    {
        id:26,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'FENCHURCH ST. STATION',
        color:'black',
        rent: 128.4,
        cost: 1284
    },
    {
        id:27,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'LEICHESTER SQUARE',
        color:'yellow',
        rent: 354.3,
        cost: 3543
    },
    {
        id:28,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'COVENTRY STREET',
        color:'yellow',
        rent: 356.5,
        cost: 3565
    },
    {
        id:29,
        playersOnBlock:[],
        type:'PROPERTY',
        name: "WATER WORKS",
        color:'black',
        onDiceRoll: true,
        rent: 100,
        cost: 35
    },
    {
        id:30,
        playersOnBlock:[],
        type:'PROPERTY',
        name: 'PICCADILLY',
        color:'yellow',
        rent: 675.5,
        cost: 6755
    },
    {
        id:31,
        playersOnBlock:[],
        type:'GOT_TO_JAIL'
    },
    {
        id:32,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'REGENT STREET',
        color:'green',
        rent: 675.5,
        cost: 6755
    },
    {
        id:33,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'OXFORD STREET',
        color:'green',
        rent: 415.8,
        cost: 4158
    },

    {
        id:34,
        playersOnBlock:[],
        type:'COMMUNITY_CHEST'
    },
    {
        id:35,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'BOND STREET',
        color:'green',
        rent: 817.4,
        cost: 8174
    },
    {
        id:36,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'LIVERPOOL ST. STATION',
        color:'black',
        rent: 128.4,
        cost: 1284
    },
    {
        id:37,
        playersOnBlock:[],
        type:'CHANCE'
    },
    {
        id:38,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'PARKLANE',
        color:'blue',
        rent: 266.2,
        cost: 2662
    },
    {
        id:39,
        playersOnBlock:[],
        type:'SUPER_TAX'
    },
    {
        id:40,
        playersOnBlock:[],
        type:'PROPERTY',
        name:'MAYFAIR',
        color:'blue',
        rent: 513.9,
        cost: 5139
    }
];

export default blockList;