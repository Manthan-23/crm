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
    const [activeItem, setActiveItem] = useState('ChatBot');

    const menuItems = [
        { text: 'ChatBot', icon: MessageSquare, path: '/chatbot' },
        { text: 'Recommendation', icon: UserCircle, path: '/recommend' },
        { text: 'Analytics', icon: BarChart3, path: '/graph' },
        { text: 'Settings', icon: Settings, path: '/settings' },
    ];

    const NavContent = () => (
        <div className="h-full bg-white">
            <div className="flex items-center justify-center p-4">
                <Home size={32} />
            </div>
            <div className="h-px bg-gray-200" />
            <nav className="p-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.text}
                            onClick={() => setActiveItem(item.text)}
                            className={`w-full flex items-center gap-4 px-4 py-2 rounded-lg mb-1 ${
                                activeItem === item.text 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'hover:bg-gray-50'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.text}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    const renderContent = () => {
        switch (activeItem) {
            case 'ChatBot':
                return <Chatbot />;
            default:
                return <div className="p-4">Select a menu item</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile menu button */}
            <button
                className="sm:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-white shadow"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                <Menu size={24} />
            </button>

            {/* Mobile nav overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile nav */}
            <div className={`fixed inset-y-0 left-0 w-${DRAWER_WIDTH}px transform ${
                mobileOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out z-40 sm:hidden`}>
                <NavContent />
            </div>

            {/* Desktop nav */}
            <div className="hidden sm:block w-60 border-r bg-white">
                <NavContent />
            </div>

            {/* Main content */}
            <div className="flex-1 p-4">
                {renderContent()}
            </div>
        </div>
    );
}

export default Index