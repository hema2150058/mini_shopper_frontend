import { useState } from "react";
import { useNavigate } from "react-router";
import './ShopperNavheader.css';

function Navbar({ currentTab }) {

    const [activeTab, setActiveTab] = useState(currentTab);

    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'logout') {
            localStorage.clear();
            navigate('/');
            window.location.reload();
        } else if (tab === 'profile') {
            navigate('/profile');
        } else if (tab === 'home') {
            navigate('/Home');
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <p style={{ fontSize: '2rem', fontFamily: "calibri", paddingLeft: "2rem" }}>My HealthApp</p>
                <nav className="tab-navigation">
                    <ul>
                        <li className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>Home</li>
                        <li className={activeTab === 'help' ? 'active' : ''} onClick={() => handleTabClick('help')}>Help & Support</li>
                        <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}>Profile</li>
                        <li onClick={() => handleTabClick('logout')}>Logout</li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;