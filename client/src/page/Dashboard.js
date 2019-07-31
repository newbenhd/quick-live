import React from "react";
import {connect} from 'react-redux';
import * as actions from '../actions/registry.action';
import ReactLoading from 'react-loading';
import * as d3 from 'd3';

class Graph extends React.Component {
  state = {
    type: 'hierarchy',
    data: []
  };
  getFamilyTree = (data = [{},
                           {},
                           {},
                           {}]) => {
    const dataStructure = d3.stratify().id(d=>d.child).parentId(d=>d.parent)(data);
    const treeLayout = d3.tree().size([100, 100]);
    const information = treeLayout(dataStructure);
    const circles = d3.select('svg g#circles').selectAll('circle').data(information.descendents());
    circles.enter().append('circle').attr('cx', d=> d.x).attr('cy', d=>d.y).attr('r', 1);
  };
  getClassicFamilyTree = (data = []) => {

  };
  componentDidMount() {
    const data = {'name': '1', 'package': {name: 'express', version: '4.16.1'}, 'children': [{"name": "1.1", "children":[{'name': '1.1.1'},{'name': '1.1.2'},{'name': '1.1.3'}]}, {'name': '1.2', children: [{name: '1.2.1'},{name: '1.2.2'}] }]};
    const dataStructure = d3.hierarchy(data);
    const treeLayout = d3.tree().size([100, 100]); // width = 100%, height = 100%
    const information = treeLayout(dataStructure);
    const circles = d3.select('svg g#circles').selectAll('circle').data(information.descendants());
    circles.enter().append('circle').attr('cx', d=>(d.y * 0.5)).attr('cy', d=>(d.x * 0.5)).attr("r", 0.5);
    const connections = d3.select('svg g#lines').selectAll('line').data(information.links());
    connections.enter().append('line').attr('x1', d=>d.source.y * 0.5).attr('y1', d=>d.source.x * 0.5).attr('x2', d => d.target.y * 0.5).attr('y2', d=>d.target.x * 0.5);
    const content = d3.select('svg g#info').selectAll('text').data(information.descendants());
    content.enter().append('text').text(d=>'anonymous').attr('x', d=>(d.y * 0.5) - 5).attr('y', d=>(d.x*0.5) - 2);
  }
  render(){
    return (<svg id={'graph'} viewBox={'0 0 100 100'}>
      <g transform={'translate(5 20)'}>
        <g id={"info"}></g>
        <g id={'circles'}></g>
        <g id={'lines'}></g>
      </g>
    </svg>)
  }
}

const mapStateToProps = ({registry}) => ({
  registry: registry.payload,
  loading: registry.loading
});

const mapDispatchToProps = (dispatch) => ({
  getDependency: (packageName) => {dispatch(actions.getDependency(packageName))},
  getFullDependency: (thisPackage, packageName, version, versions) => {dispatch(actions.getFullDependency(thisPackage,packageName, version, versions))},
  getRegistry: (packageName, version, versions) => {dispatch(actions.getRegistry(packageName, version, versions))},
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
      this.props.getDependency(this.state.packageName);
      // this.props.getRegistryWithPackageName(this.state.packageName);
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
  // state = { name: this.props.registry.name, currentVersion: this.props.registry.currentVersion, versions: this.props.registry.versions
  // };
  handleSelectChange = (event) => {
    const value = event.target.value;
    // this.setState((prevState)=>({
    //   ...prevState,
    //   currentVersion: value
    // }));
    this.props.getFullDependency(this.props.registry.package, this.props.registry.name, value, this.props.registry.versions);
    // this.props.getRegistry(this.props.registry.name, value, this.props.registry.versions);
  };
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  render() {
    return (<main className={'main'}>
      <div className={'first-row'}>
        <div className={'left'}>
          <h3>{this.props.registry.name}</h3>
        </div>
        <div className={'right'}>
          <select value={this.props.registry.currentVersion} onChange={this.handleSelectChange}>
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
      <div className={'graph'}><Graph /></div>
    </main>)
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

const Loading = () => (<ReactLoading className={"loading"} type={'spin'} color={'#ff8162'} height={100} width={100}/>);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
