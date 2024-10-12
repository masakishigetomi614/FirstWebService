import React, { useState } from 'react';

function Counter() {
  // useStateでカウンターの状態を管理
  const [count, setCount] = useState(0);

  // ボタンがクリックされたときの処理
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default Counter;
