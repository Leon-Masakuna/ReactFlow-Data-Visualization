import React from 'react';
import { useState, useCallback } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, Controls, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import endActivities from "../data/start_activities.json"

const endNode =
    {
        id: "Z",
        position: { x: 1000, y: 800 },
        data: { label: "End Node" },
    }

const initialEdges = Object.keys(endActivities).map((key, index) => {
    return{
        id: `${index + 1} - Z`, 
        source: `${index + 1}`, 
        target: `Z`, 
        label: index,
    }
})

const initialNodes = Object.keys(endActivities).map((key, index) => {
    return {
        id: `${index}`,
        position: {
            x: index * 10 * Math.floor(Math.random() * 5),
            y: endActivities[key] * 10 * Math.floor(Math.random() * 5),
        },
        data: {label : key},
    };
});

const Flow = () => {
    const [nodes, setNodes] = useState([...initialNodes, {...endNode}]);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    return (
        <div style={{ height: '86vh' }}>
            <ReactFlow 
                nodes={nodes}
                onNodesChange={onNodesChange} 
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default Flow;