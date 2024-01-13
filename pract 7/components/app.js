import { useState } from 'react';
import * as uuid from 'uuid';
import GoodsComponent from './goods';
import CounterComp from './counter';
import './style.css';
import GoodsMock from './goodsMock.json';
import GoodsContext from '../context/goods.context';
import CampComponent from './camp';

const AppComponent = () => {
 const goods = GoodsMock.map(el => ({
   ...el,
   id: uuid.v1()
 }));

 const [data, setData] = useState(goods);
 const [selectedGoods, setSelectedGoods] = useState([]);

 const addGoods = item => {
   setSelectedGoods(prevSelectedGoods => [...prevSelectedGoods, item]);
 };

 const removeGoods = item => {
   setSelectedGoods(prevSelectedGoods =>
     prevSelectedGoods.filter(el => item.id !== el.id)
   );
 };

 const removeAllGoods = () => {
   setData(prevData =>
     prevData.filter(el => !selectedGoods.find(item => item.id === el.id))
   );
   setSelectedGoods([]);
 };

 return (
   <div className='app'>
     <div className='wrapper'>
       <GoodsContext.Provider
         value={{
           selectedGoods,
           addGoods,
           removeGoods,
           removeAllGoods,
           data
         }}
       >
         <CounterComp />
         <div className='goods-wrapper'>
           {data.map(el => (
             <GoodsComponent {...el} key={el.id} />
           ))}
         </div>
         <CampComponent />
       </GoodsContext.Provider>
     </div>
   </div>
 );
};

export default AppComponent;
