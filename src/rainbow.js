var Rainbow = React.createClass({
	getInitialState:function() {
		return {
			doubleRainbow: this.props.doubleRainbow || false
		}
	},
	componentDidUpdate: function() {
		console.log('Rainbow Update Called!');
	},
	drawRainbow:function() {	
		var doubleRainbow = this.state.doubleRainbow;
		var colors = this.props.data;
		if(doubleRainbow){
			colors = colors.concat(colors);
		}
		return colors.map(function(color,i){
			return <RainbowRow color={color.hex} key={i} />
		})
	},
	changeState:function(props){
		this.setState({
			doubleRainbow: !this.state.doubleRainbow
		}, function() {
			console.log("Double Rainbow State updated to: "+this.state.doubleRainbow);
		})
	},
	drawOptions:function() {
		return (
			<div className="options">
				<input type="checkbox" checked={this.state.isChecked} onChange={this.changeState} />Double Rainbow
			</div>
		)
	},
	render: function() {
		var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
		return (
			<div className='container' >
			<ReactCSSTransitionGroup transitionName="rainbowRow" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				{ this.drawRainbow() }
				{ this.drawOptions() }
			</ReactCSSTransitionGroup>
			</div>
		)
	}
})
var RainbowRow = React.createClass({
	getInitialState: function(){
		return {
			isSelected: this.props.isSelected || false
		}
	},
	componentDidUpdate: function() {
		console.log('Rainbow Row Update Called!');
	},
	handleClick:function() {
		this.setState({
			isSelected: !this.state.isSelected
		},function(){ 
			console.log('Rainbow Row state updated to: '+this.state.isSelected);
		})
	},
	render: function() {
		var highlightColor = "#FFFFFF"
		var style = {
			backgroundColor: this.props.color,
			padding: '0 25px',
			display: 'inline-block',
			height: window.innerHeight+"px"
		};
		if(this.state.isSelected) {
			style.backgroundColor = highlightColor;
		}
		return <a onClick={this.handleClick} isSelected={this.state.isSelected} href="#" style={style}></a>
	}
})
ReactDOM.render(<Rainbow data={colorData}  />, document.getElementById('rainbow'));