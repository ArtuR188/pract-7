import { useContext } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';

const CounterComponent = () => {
 const { data, addGoods, selectedGoods } = useContext(GoodsContext);

 let start = null;

 const AutoDetectButton = (props) => {
  let { arr, i = 0, sumforauto = 0, result = [] } = props;

  const newSum = sumforauto + arr[i].cost;

  if (newSum === 40) {
    result.push(i);
    result.forEach((index) => {
      if (!selectedGoods.some((item) => item.id === data[index].id)) {
        addGoods(data[index]);
      }
    });
    return result;
  }

  if (i === arr.length - 1) {
    return result;
  }

  if (newSum < 40) {
    result.push(i);
    return AutoDetectButton({
      i: i + 1,
      arr,
      sumforauto: newSum,
      result: result,
    });
  }

  if (newSum > 40) {
    result.length = 0;
    start = start + 1;
    return AutoDetectButton({
      i: start,
      arr,
      sumforauto: 0,
      result: result,
    });
  }
 };

 const handleAutoDetect = () => {
  data.sort((a, b) => a.cost - b.cost);
  AutoDetectButton({ arr: data });
 };

 const sum = selectedGoods.reduce((acc, cur) => {
  return acc + cur.cost;
 }, 0);

 return (
  <div className='cost-wrapper'>
   <div className='header'>Shopping Cart</div>
   <div className='total'>{sum}/40</div>
   <div className='auto-detect' onClick={handleAutoDetect}>
    Auto Detect
   </div>
   <div className='selected-goods'>
    {selectedGoods.map((el) => (
     <GoodsComponent {...el} key={'selected' + el.id} />
    ))}
   </div>
  </div>
 );
};

export default CounterComponent;
