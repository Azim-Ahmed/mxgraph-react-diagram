import React from 'react';
import ReactDOM from 'react-dom';
import {
    mxClient,
    mxUtils,
    mxEvent,
    mxGraph,
    mxRubberband
} from 'mxgraph-js';

export default class App extends React.Component {
    //I don't know what happened, but if you have any questions, please comment back and have a look.

    constructor(props) {
        super(props);
        this.LoadGraph = this.LoadGraph.bind(this);
    }

    componentDidMount() {
        this.LoadGraph();
    }

    LoadGraph() {
        var container = ReactDOM.findDOMNode(this.refs.divGraph);
        console.log('yeeee');
        console.log(mxClient);
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error("Browser is not supported!", 200, false);
        } else {
            //Open area selection
            mxEvent.disableContextMenu(container);
            var graph = new mxGraph(container);
            //After setting this property, the nodes can be connected
            graph.setConnectable(false);
            new mxRubberband(graph);
            var parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
                var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
                var e1 = graph.insertEdge(parent, null, '30%', v1, v2);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    }

    render() {
        return <div className="graph-container" ref="divGraph" id={this.props.id} />;
    }
}