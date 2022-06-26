import { Component} from "react";
import HeaderBlock from "../headerBlock/headerBlock";
import HeroesList from "../heroesList/HeroesList";
import AuthorizationBlock from "../authorizationBlock/authorizationBlock"

class App extends Component {

  render () { 
 
  return (
    <div className="mx-auto my-0 w-[1200px] py-12">
      <HeaderBlock/>
      <main className="flex">
        <HeroesList/>
        <AuthorizationBlock/>
      </main>
    </div>
  );
  }
}

export default App;
