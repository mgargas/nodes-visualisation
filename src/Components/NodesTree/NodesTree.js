import React, {PureComponent} from 'react';
import {Treebeard} from 'react-treebeard';
import {BeatLoader} from "react-spinners";
import api from "../../api";

class NodesTree extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.onToggle = this.onToggle.bind(this);
    }

    fetchAndSetAllNodes() {
        document.body.style.cursor = 'wait';
        api.fetch(
            api.endpoints.getAllNodes(),
            (response) => {
                if (response.status !== 500) {
                    let result = response.map(node => ({
                        id: node.id,
                        name: node.name,
                        children: node.nodes
                    }));
                    this.setState({
                        data: {
                            name: "NODES",
                            children: result
                        }
                    });
                    console.log(this.data)
                }
            });
    };

    componentDidMount() {
        this.fetchAndSetAllNodes()
    }

    onToggle(node, toggled) {
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }

    render() {
        const {data} = this.state;
        return (this.state.data ?
                <Treebeard
                    data={data}
                    onToggle={this.onToggle}
                /> : (
                    <BeatLoader
                        size={10}
                        color={"#3f51b5"}
                    />
                )
        );
    }
}

export default NodesTree