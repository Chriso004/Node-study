const user = {
  name: 'cHr1s0'
};

const div = (
  <div>
    <h1>Hello World!</h1>
    <h1>{user.name}'s Project!</h1>
  </div>
);

const App = () => {
  return (
    div
  );
}

export default App;
