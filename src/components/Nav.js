import { Link } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav>
        <Link to='/'>
          Home
        </Link>
      </nav>

      <ul>
        <Link to='/records'>
          Records
        </Link>
      </ul>
    </>
  );
}

export default Nav;