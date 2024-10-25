import {useState} from 'react'
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
  } from '@mui/material';

  import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Description as DocumentIcon,
    Dashboard as DashboardIcon,
  } from '@mui/icons-material';


  const DRAWER_WIDTH = 240;

const Index = () => {

    const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'ChatBot', icon: <DashboardIcon />, path: '/chatbot' },
    { text: 'Recommendation', icon: <PersonIcon />, path: '/profile' },
    { text: 'Analytics', icon: <DocumentIcon />, path: '/graph' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          justifyContent: 'center',
        }}
      >
        <HomeIcon sx={{ fontSize: 32 }} />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
   
   {/* <Box display="flex">
      
      <Box
        sx={{bgcolor:"#f0f0f0", 
        
            width:"100vh",
            height:"92vh"}}
        
        
        
      >
        <Typography variant="h4" gutterBottom>
          CRM Bot
        </Typography>
        <List sx={{ flexGrow: 1 }}>
          {messages.map((msg, index) => (
            <ListItem key={index}>{msg}</ListItem>
          ))}
        </List>
      </Box>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        padding={2}
        width="10%"
      >
        <TextField
          label="Type a message"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box> */}



    {/* <Stack direction='row'>
        <Box sx={{backgroundColor:'red'}}>
        <Typography>One</Typography>
        </Box>

        <Box sx={{backgroundColor:'blue'}}>
            <Typography>Two</Typography>
        </Box>
    </Stack> */}

        {/* Mobile hamburger menu */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </Drawer>

    </>
  )
}

export default Index