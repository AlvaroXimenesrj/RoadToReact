import * as React from 'react';
import './App.css';

// only once and not every time the function is called
const titleTwo = 'React2'
const welcome = {
  greeting: 'Hey',
  title: 'React',
};


function getTitle(title) {
  return title;
}

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

// React have component hierarchies. App (root component) is the parent componentof the list and Search, so the List and Search are child components.
function App() { // Or "const App = () => { ... }"
  // re-rendered when it updates
  console.log('re-render App')

  const title = 'React'
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // const [searchTerm, setSearchTerm] = React.useState('');  
  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') || 'React'
  // );
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );
  // trigger the side-effect each time searchTerm changes
  // if array is an empty, function for the side-effect called once, after the component renders the first time
  // React.useEffect(() => {
  //   console.log('use effect')
  //   localStorage.setItem('search', searchTerm);
  // }, [searchTerm]);




  // callback handler
  const handleSearch = (event) => {
    console.log('handleSearch from App')
    console.log(event.target.value);
    setSearchTerm(event.target.value);
    // localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hello {title}</h1>
      <h1>
        {/* curly braces in JSX can be used for javascript*/}
        {welcome.greeting} {welcome.title}
      </h1>
      <h1>Hello {getTitle('React')}</h1>
      {/* <label htmlFor="search">Search: </label>
      <input id="search" type="text" /> */}
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />
      <br />
      <h1>Hello {titleTwo}</h1>
      <br />
      { /* - renders each item of the list
           - assigning a key attribute to each list item element to react identify items if the lista changes  */}
      <ul>
        {list.map((item, index) => {
          return (
            <li key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </li>);
        })}
      </ul>
      <hr />
      <Search onSearch={handleSearch} />
      <hr />
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      { /* - using the List component
           - concept of a class with definition and instantiation is similar to a React component... we can have multiple component instances */}
      <List />
      {/* pass stories list variable */}
      <List list={stories} />

      <List list={searchedStories} />

    </div>
  );
}

const List = ({ list }) => {
  // console.log(props)
  return (
    <>
      <ul>
        {list && list.map(function (item) {
          return (
            <li key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </li>
          );
        })}
      </ul>
      <br />
      <h1>With props</h1>
      <ul>
        { /* using props */}
        {list && list.map((item) => (
          <Item key={item.objectID} item={item} />
        ))}
      </ul>
    </>
  );
}

const Item = ({
  item: {
    title,
    url,
    author,
    num_comments,
    points,
  },
}) => (
  // nested destructuring

  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

function Search(props)/*or: ({ search, onSearch }) */ {
  // apply the javascript destructuring
  const { search, onSearch } = props;
  // When I type in the input, it only re-renders the Search component
  console.log('re-render Search')
  // React Hook: '' as the initial state useState return a array with two entries: current state and second: function to update this state (setSearchTerm)
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    // searchTerm = event.target.value;
    setSearchTerm(event.target.value);

    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      { /* dont do this: handleChange() */}
      {/* <input id="search" type="text" onChange={handleChange} /> */}
      {/* Now, Search comp doesnt manage the state anymore */}
      <input
        id="search"
        type="text"
        // value={props.search}
        // onChange={props.onSearch}
        value={search}
        onChange={onSearch}
      />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
}
// Custom hook
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const InputWithLabel = ({
  id,
  label,
  value,
  type = 'text',
  onInputChange,
}) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);

export default App;
