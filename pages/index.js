/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../styles/Home.module.css';  // CSSモジュールをインポート

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // スライダー用画像配列
  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg'
  ];

  useEffect(() => {
    fetchTodos();

    // 画像の自動切り替えを設定
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3秒ごとに切り替え

    return () => clearInterval(interval); // コンポーネントがアンマウントされたらタイマーを解除
  }, []);

  const fetchTodos = async () => {
    const { data } = await supabase.from('todos').select('*');
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task) return;

    const { data, error } = await supabase.from('todos').insert([{ task }]);

    if (error) {
      console.error('Error inserting todo:', error);
      return; // エラーが発生した場合、処理を中止
    }

    if (data && Array.isArray(data)) {
      setTodos([...todos, ...data]);
    } else {
      console.error('Data is not an array:', data);
    }

    setTask('');
    fetchTodos();
  };

  const toggleTodo = async (id, is_completed) => {
    const { data, error } = await supabase
      .from('todos')
      .update({ is_completed: !is_completed })
      .eq('id', id);

    if (error) {
      console.error('Error updating todo:', error);
      return; // エラーが発生した場合、処理を中止
    }

    if (data && Array.isArray(data) && data.length > 0) {
      setTodos(todos.map((todo) => (todo.id === id ? data[0] : todo)));
    } else {
      console.error('Data is not valid:', data);
    }
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(todos.filter((todo) => todo.id !== id));
    fetchTodos();
  };

  // 画像を次へ進める関数
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 画像を前に戻す関数
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      {/* スライダー */}
      <div className={styles.sliderWrapper}>
        <img
          src={images[currentImageIndex]}
          alt="スライダー画像"
          className={styles.sliderImage}
        />

        {/* 画像の前後ボタンを画像上に透明で配置 */}
        <button onClick={prevImage} className={`${styles.button} ${styles.prevButton}`}>
          {'<'}  {/* 左矢印 */}
        </button>

        <button onClick={nextImage} className={`${styles.button} ${styles.nextButton}`}>
          {'>'}  {/* 右矢印 */}
        </button>
      </div>

      {/* 入力フォームとAddボタン */}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.addButton}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.is_completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button onClick={() => toggleTodo(todo.id, todo.is_completed)}>Toggle</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
