import React from "react";
import ReactDOM from "react-dom";
import {
	mxClient,
	mxUtils,
	mxEvent,
	mxGraph
} from "mxgraph-js";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.LoadGraph = this.LoadGraph.bind(this);
	}

	componentDidMount() {
		this.LoadGraph();
	}

	LoadGraph() {
		// Generating MxGraph
		var container = ReactDOM.findDOMNode(this.refs.divGraph);
		// Checks if the browser is supported
		if (!mxClient.isBrowserSupported()) {
			// Displays an error message if the browser is not supported.
			mxUtils.error("Browser is not supported!", 200, false);
		} else {

			//Disable right mouse button
			mxEvent.disableContextMenu(container);

			var graph = new mxGraph(container);


			//Set the graph of the upper layer to inform that it is in the initialization phase
			graph.init = true;
			this.props.setGraph(graph);
		}
	}

	render() {
		return <div className="graph-container" ref="divGraph" id={this.props.id} />;
	}
}

export default App;
