// function Header() {
//   return (
//     <header className='app-header'>
//       <img src='logo512.png' alt='React logo' />
//       <h1>The React Quiz</h1>
//     </header>
//   );
// }

import React,{ Component } from "react";

class Header extends Component {
  
  render() {
    return (
      <header className="app-header">
        <img src="logo512.png" alt="React logo" />
        <h1>The React Quiz</h1>
      </header>
    );
  }
}

export default Header;
