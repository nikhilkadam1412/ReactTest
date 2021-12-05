import React from "react";
import { Button } from "reactstrap";
import { useHistory } from 'react-router-dom';


function HomePage() {
    const history = useHistory();

    const goToDashboard = () => {
        // navigate('/user-dashboard');
        history.push('/user-dashboard')
    }

    return (
        <div className="home_page bgimg">
            <div className="banner_text">
                <h2>Task Management</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <Button color="primary" onClick={goToDashboard}>Create a task</Button>
            </div>
        </div>
    )
}

export default HomePage;