import { useContext } from 'react';
import CampIcon from './camp-table.png';
import './style.css';
import GoodsContext from '../../context/goods.context';

const CampComponent = () => {
 const { removeAllGoods, selectedGoods } = useContext(GoodsContext);

 const campClick = () => {
  const totalCost = selectedGoods.reduce((acc, cur) => acc + cur.cost, 0);

  if (totalCost === 40) {
    removeAllGoods();
  } 
 };

 return (
  <div className="camp">
   <img src={CampIcon} onClick={campClick} />
  </div>
 );
};

export default CampComponent;