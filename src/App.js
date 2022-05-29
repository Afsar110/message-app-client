import React,{ useState, useEffect} from 'react';
import './App.css';
import 'tachyons';
import Table from './components/Table';
import SearchBox from './components/SearchBox';
import rows from './tableData'
import Loginpage from './components/Loginpage';
import { Button, Stack } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import MRActionModal from './components/MRActionModal';
import api from './action/api';
function App() {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState(rows);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMRModalOpen, setIsMRModalOpen] = useState(false);
  const [MRAction, setMRAction] = useState({});
  const handleMasterAction = () => {
    setIsMRModalOpen(true)
  };
  useEffect(()=>{
    api.checklogin().then(response => {
      if (response && response.status) {
        setIsLoggedIn(true);
        api.bootstrap().then(res=> {
          if(res && res.status) {
            setMRAction(res.data)
          }
        });
      }
    });
  },[])
  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false)
  };
  const handleMRActionSend = async (data) => {
    if(data.actionSelect || data.to) {
      const resp = await api.updateMasterAction(data.actionSelect,data.to);
      if(resp.status) {
        setIsMRModalOpen(false);
      } else {
        alert(resp.message)
      }
    }
  }
  const handleDelete=(selectedRow)=> {
    if(Array.isArray(selectedRow)){

    } else {
      setTableData(rows => {
        return rows.filter(row=>row.id !== selectedRow.id);
      });
    }

  }

  const searchClicked = () => {
    console.log('searching', searchText);
    const updateTableData = rows.filter(row => {
      let found = false;
      Object.keys(row).forEach(key=> {
        if (typeof row[key] === 'string')
        found = found || row[key].toLowerCase().includes(searchText.toLowerCase());
      });
      return found;
    });
    setTableData(updateTableData)
  }
  const handleLogin=async ({email, password})=>{
    const loginAction = await api.login(email,password);
    if (loginAction && loginAction.status) {
      setIsLoggedIn(true);
      api.bootstrap().then(res=> {
        if(res && res.status) {
          setMRAction(res.data)
        }
      });
    }
    // setIsLoggedIn(prev => !prev)
  }
  return (
    <div className="App tc">
      {isLoggedIn ? (
      <Stack spacing={2} direction="column" className="justify-center">
        <MRActionModal open={isMRModalOpen} data={MRAction} handleClose={()=> setIsMRModalOpen(false)} handleSendClicked={handleMRActionSend} />
        <Stack spacing={2} direction="row" className="justify-between">
          <div style={{ display: 'flex',alignItems: 'center' }}>
            <MessageIcon fontSize="large" />
            <p >My Messages</p>
          </div>
          <SearchBox text={searchText} updateText={setSearchText} search={searchClicked}/>
          <div>
          <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="success" onClick={handleMasterAction} sx={{mr:4}} >Master Action</Button>
          <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="error" onClick={handleLogout} >Logout</Button>
          </div>
        </Stack>
      <Table data ={tableData} delete={handleDelete}/>
      </Stack>
      ): 
    <Loginpage login={handleLogin}/>
  }
    </div>
  );
}

export default App;
