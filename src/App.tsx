import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MoonReport from "./pages/MoonReport";
import SideNav from "./components/sideNav";
import { set_crypto_options } from "./redux/actions/cryptoOptions.action";
import { set_crypto_chart_data } from "./redux/actions/cryptoChartData.action";
import { toggle_is_loading } from "./redux/actions/isLoading.action";
import { StoreState } from "./redux/reducers/index";
import { useSelector, useDispatch } from "react-redux";
import ReactGA from "react-ga";

function App() {
  const dispatch = useDispatch();
  const initialList = useSelector(
    (state: StoreState) =>
      state.initialList.initialList && state.initialList.initialList
  );

  //   function initializeReactGA() {
  //     ReactGA.initialize('UA-177403687-1');
  //     ReactGA.pageview('/');
  // }

  useEffect(() => {
    ReactGA.initialize("UA-177403687-1");
    ReactGA.pageview("/");
    // fetch(
    //   "https://coinlib.io/api/v1/coin?key=b3c0b86e83461c72&pref=USD&symbol=BTC,ETH,XRP,BCH,XLM"
    // )
    // fetch("https://api.coinmarketcap.com/v2/ticker/?limit=10")
    // fetch(
    //   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4e5ab13e-16e1-493a-bc9a-cad9614fbe5f&id=1"
    // )
    // fetch(
    //   "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,BCH,BSV,LTC,EOS,BNB,XTZ,ADA&tsyms=USD&api_key=de95ede36af04390324f1d05bbbac53d9c49bae0dc13a3af7458185f7d910e8b"
    // )
    // .then((resp) => resp.json())
    // .then((jsonResponse) => {
    //   console.log(jsonResponse);
    // });
    // fetch(
    //   "https://api.nomics.com/v1/currencies/ticker?key=66ea6a311e39603da3feaa3292a81b9b&ids=BTC,ETH,XRP,BSV,ADA,BNB,LTC,XTZ,EOS,XMR,TRX,XLM,BAT,LINK,BCH&interval=1d&convert=USD"
    // )
    dispatch(toggle_is_loading());
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${initialList}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(set_crypto_chart_data(data));
        dispatch(toggle_is_loading());
      });

    fetch("https://api.coingecko.com/api/v3/coins/list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(set_crypto_options(data));
      });
  }, [initialList]);

  return (
    <Wrapper>
      <SideNav />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/moon/report/:id" component={MoonReport} exact />
        <Route path="/404" component={NotFound} exact />
        <Redirect to="/404" />
      </Switch>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
