import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import {version, binance,kucoin,bybit,mexc,huobi} from 'ccxt';

let kucoin_data_route={}
let bybit_data_route={}
let mexc_data_route={}
let htx_data_route={}
let asd_data_route={}
let gate_data_route={}
let kucoin_data_dfyn={}
let bybit_data_dfyn={}
let mexc_data_dfyn={}
let htx_data_dfyn={}
let asd_data_dfyn={}
let gate_data_dfyn={}
let uniswap_data_route_eth={}
let uniswap_data_route_usdc={}
let uniswap_data_route_eth_v3={}
let uniswap_data_dfyn_eth={}
// const exchange = new binance();
// const exchange1 = new kucoin();
// const ticker = await exchange1.fetchTicker('ROUTE/USDT');
// console.log(ticker);




const app = express();
app.use(cors());
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Define a route to handle proxy requests
app.get('/hello', async (req, res) => {
    res.send('Hare Krishna');
});

app.get('/proxy', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ error: 'Missing URL parameter' });
        }

        // Make a request to the KuCoin API
        const response = await fetch(url);

        // Forward the response back to the client
        res.json(await response.json());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/exchange', async (req, res) => {
    try {
        const exchangeName = req.query.exchangeName;
        let exchange=new bybit()
        if (!exchangeName) {
            return res.status(400).json({ error: 'Missing URL parameter' });
        }
        switch (exchangeName) {
            case 'binance':
                exchange = new binance();
                break;
            case 'kucoin':
                exchange = new kucoin();
                break;
            case 'bybit':
                exchange = new bybit();
                break;
            case 'mexc':
                exchange = new mexc();
                break;
            case 'huobi':
                exchange = new huobi();
                break;
            // Add cases for other exchanges as needed
            default:
                // Handle unsupported exchange
                throw new Error(`Unsupported exchange: ${exchangeName}`);
        }
        const ticker = await exchange.fetchTicker('ROUTE/USDT');
        res.send(ticker)

     
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




const fetchData = () => {

    //kucoin

    fetch(`http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/stats?symbol=ROUTE-USDT`)
        .then(response => response.json())
        .then(data => {
            // Replace the global object with the fetched object
           kucoin_data_route = data;
            // console.log('Global object updated with data from API:', kucoin_data);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        fetch(`http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/stats?symbol=DFYN-USDT`)
        .then(response => response.json())
        .then(data => {
            // Replace the global object with the fetched object
           kucoin_data_dfyn = data;
            // console.log('Global object updated with data from API:', kucoin_data);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

  



    //mexc

    fetch(`http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/ticker/24hr?symbol=ROUTEUSDT`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
       mexc_data_route = data;
        // console.log('Global object updated with data from API:',mexc_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/ticker/24hr?symbol=DFYNUSDT`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
       mexc_data_dfyn = data;
        // console.log('Global object updated with data from API:',mexc_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    //houbi

    fetch(`http://localhost:${PORT}/proxy?url=https://api.huobi.pro/market/detail?symbol=routeusdt`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
       htx_data_route = data;
        // console.log('Global object updated with data from API:',htx_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  

    // ascendx

    fetch(`http://localhost:${PORT}/proxy?url=https://ascendex.com/api/pro/v1/spot/ticker?symbol=ROUTE/USDT`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
      asd_data_route = data;
        // console.log('Global object updated with data from API:',asd_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    // gate

    fetch(`http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/tickers?currency_pair=route_usdt`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
      gate_data_route = data;
        // console.log('Global object updated with data from API:',gate_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/tickers?currency_pair=dfyn_usdt`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
      gate_data_dfyn = data;
        // console.log('Global object updated with data from API:',gate_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    

    //uniswap

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x819de42d3ab832eaf7111a222a8a5a7419f13b48`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
      uniswap_data_route_usdc = data;
        // console.log('Global object updated with data from API:',gate_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x92CC4300B9FD36242900BcA782b2E9E000BD5099`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
      uniswap_data_route_eth = data;
        // console.log('Global object updated with data from API:',gate_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x5c2b3Edbe845764B99eAebE87377F1F9D27D2a7E`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
      uniswap_data_route_eth_v3 = data;
        // console.log('Global object updated with data from API:',gate_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0xCAb335e1964363e48A790DA303B74Ec02D3F8fB2`)
    .then(response => response.json())
    .then(data => {
        // Replace the global object with the fetched object
      uniswap_data_dfyn_eth = data;
        // console.log('Global object updated with data from API:',gate_data);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    


    }
fetchData();

const interval = setInterval(fetchData, 10 * 1000);

app.get('/kucoindata',(req,res)=>{

    const token = req.query.token;
    if(token=="route")
    res.send(kucoin_data_route)
    else
    res.send(kucoin_data_dfyn)
})
app.get('/bybitdata',(req,res)=>{
    res.send(bybit_data_route)
})

app.get('/mexcdata',(req,res)=>{
    const token = req.query.token;
    if(token=="route")
    res.send(mexc_data_route)
    else
    res.send(mexc_data_dfyn)
})

app.get('/htxdata',(req,res)=>{
    res.send(htx_data_route)
})

app.get('/asddata',(req,res)=>{
    res.send(asd_data_route)
})

app.get('/gatedata',(req,res)=>{
    const token = req.query.token;
    if(token=="route")
    res.send(gate_data_route)
    else
    res.send(gate_data_dfyn)
})

app.get('/uniswapdata',(req,res)=>{
    const token = req.query.token;
    if(token=="routeusdcv2")
        res.send(uniswap_data_route_usdc)
    else if(token=="routeethv2")
        res.send(uniswap_data_route_eth)
    else if(token=="routeethv3")
        res.send(uniswap_data_route_eth_v3)
    else if(token=="dfynethv2")
        res.send(uniswap_data_dfyn_eth)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

