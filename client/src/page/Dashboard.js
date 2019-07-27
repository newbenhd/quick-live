import React from "react";
import {connect} from 'react-redux';
import * as actions from '../actions/registry.action';
import ReactLoading from 'react-loading';

const mapStateToProps = ({registry}) => ({
  registry: registry.payload,
  loading: registry.loading
});

const mapDispatchToProps = (dispatch) => ({
  getRegistry: (packageName, version) => {dispatch(actions.getRegistry(packageName, version))},
  getRegistryWithPackageName: (packageName) => {dispatch(actions.getRegistryWithPackageName(packageName))}
});

class Dashboard extends React.Component {
  render() {
    return (
      <div className="page dashboard">
          <Header renderMain={this.renderMain} />
          {
            this.props.registry ? <Main /> : undefined
          }
          {
            this.props.loading ? <Loading className={'loading'} /> : undefined
          }
      </div>
    );
  }
}

class HeaderComponent extends React.Component {
  state = {
    packageName: ''
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState)=>({
      ...prevState,
      [name]: value
    }));
  };
  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.props.getRegistryWithPackageName(this.state.packageName);
      this.setState((prevState)=>({
        ...prevState,
        packageName: ''
      }));
    }
  };
  render() {
    return (<header className={'header'}>
      <div className={'container'}>
        <div className={'left'}>
          Left content
        </div>
        <div className={'center'}>
          <input name={'packageName'} value={this.state.packageName} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} type={'text'} placeholder={'Enter npm package...'}/>
        </div>
        <div className={'right'}>
          <ul>
            <li>
              User profile
            </li>
            <li>
              <button>Authentication content</button>
            </li>
          </ul>
        </div>
      </div>
    </header>)
  }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

class MainComponent extends React.Component {
  componentDidMount() {

  }
  render() {
    return (<main className={'main'}>
      <div className={'first-row'}>
        <div className={'left'}>
          <h3>{this.props.registry.name}</h3>
        </div>
        <div className={'right'}>
          <select>
            <option value={'choose'}>version</option>
            {
              Object.keys(this.props.registry.versions).map((key)=>{
                return <option key={key} value={`${key}`}>{key}</option>
              })
            }
          </select>
        </div>
      </div>
      <div className={'second-row'}>General content boxes</div>
      <div className={'stats'}>Stats and User interact</div>
      <div className={'graph'}>Graph shown</div>
    </main>)
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

const Loading = () => (<ReactLoading className={"loading"} type={'spin'} color={'#ff8162'} height={100} width={100}/>);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
