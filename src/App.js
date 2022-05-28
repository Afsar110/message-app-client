import React,{ useState} from 'react';
import './App.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'tachyons';
import Table from './components/Table';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchBox from './components/SearchBox';
import rows from './tableData'
import Loginpage from './components/Loginpage';
function App() {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState(rows);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchClicked = () => {
    console.log('searching', searchText);
    const updateTableData = rows.filter(row => {
      let found = false;
      Object.keys(row).forEach(key=> {
        if (typeof row[key] === 'string')
        found = found || row[key].includes(searchText);
      });
      return found;
    });
    setTableData(updateTableData)
  }
  const handleLogin=()=>{
    setIsLoggedIn(prev => !prev)
  }
  return (
    <div className="App tc">
      {isLoggedIn ? (<>
        <SearchBox text={searchText} updateText={setSearchText} search={searchClicked}/>
      <Table data ={tableData}/>
      </>): 
    <Loginpage login={handleLogin}/>
  }
    </div>
  );
}

export default App;
