import React from 'react';

const CreateListings = () => {
  return (
    <div>
        <form action="/action_page.php">
            <label htmlFor="fname">First name:</label><br/>
            <input type="text" id="fname" name="fname"/><br/>
            <label htmlFor="lname">Last name:</label><br/>
            <input type="text" id="lname" name="lname"/><br/><br/>
            <input type="submit"/>
        </form> 
    </div>
  );
}

export default CreateListings;