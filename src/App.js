import React, { useState, useEffect } from "react";

import { mxGraph, mxRubberband, mxShape, mxConnectionHandler, mxGraphModel, mxGeometry } from "mxgraph-js";

import App from "./Components/App";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Toolbar from "./Components/Toolbar";
import AttributeEditor from "./Components/AttributeEditor";

import setDeleteEvent from "./Components/setDeleteEvent";
import setStylesheet from "./Components/setStylesheet";
import setAnchors from "./Components/setAnchors";
import setClipboard from "./Components/setClipboard";
import setDefault from "./Components/setDefault";

import "./Css/Main.css";
import "./Css/Images.css";
import "./Css/common.css";
import "./Css/explorer.css";
import "./Css/hamburger_menu.css";

const Main = () => {
	// mxGraph object
	const [graph, setGraph] = useState(null);
	const [callFooter, setCallFooter] = useState(null);
	const [callToolbar, setCallToolbar] = useState(null);
	const [callHeader, setCallHeader] = useState(null);
	const [callAttributeEditor, setCallAttributeEditor] = useState(null);

	//Called when the graph changes
	useEffect(() => {
		if (graph !== null && graph.init === true) {
			//Set the window global variable to be used inside mxGraph
			window["mxGraphModel"] = mxGraphModel;
			window["mxGeometry"] = mxGeometry;

			//Initialize mxGraph
			graph.init = false;
			setGraph(graph);

			//After setting this parameter, the nodes can be connected
			graph.setConnectable(true);

			//Turn on pan
			graph.setPanning(true);

			//Open range selection
			new mxRubberband(graph);

			//to delete the node
			setDeleteEvent(graph);

			// setStylesheet mxStylesheet
			setStylesheet(graph);

			//Set anchor point
			// Overridden to define per-shape connection points
			setAnchors(mxGraph, mxShape);

			//Some functions of Overridden mxGraph
			setDefault(graph, mxConnectionHandler);

			//Set clipboard
			//There are bugs and cannot be used
			setClipboard(graph);

			//Set UML Object to pull into graph
			setCallFooter("setUMLObjs");

			// 設定工具列
			//Settings toolbar
			setCallToolbar("setToolbar");
			//Configure Attribute Editor
			setCallAttributeEditor("setAttributeEditor");

			setCallHeader("setHeader");

			var attrTriger = document.getElementById('attrTriger');
			attrTriger.click();
		}
	}, [graph]);

	return (
		<div id="main">
			<Header id="header" graph={graph} parentCall={callHeader} />
			<Toolbar id="toolbar" graph={graph} parentCall={callToolbar} />
			<App id="canvas" setGraph={setGraph} />
			<div id="menuToggle">
				<input id="attrTriger" type="checkbox" />
				<span></span>
				<span></span>
				<span></span>

				<ul id="menu">
					<AttributeEditor id="attributeEditor" graph={graph} parentCall={callAttributeEditor} />
				</ul>
			</div>
			<Footer id="objectSelector" graph={graph} parentCall={callFooter} />
		</div>
	);
}
export default Main;